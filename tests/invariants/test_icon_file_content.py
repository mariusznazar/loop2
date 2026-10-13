"""Invariant icon-file-content/1: No SVG file directly in `assets/icons/` holds a `script` or
`foreignObject` SVG element, an attribute whose name begins with `on`, or a reference to anything
outside the file other than the SVG and XLink namespace declarations.

The files are the files with the extension `.svg` (any case) that git tracks or would track
directly in `assets/icons/`, read from the working tree.

Reading of the sentence:
- a `script` or `foreignObject` SVG element: an element of the file with that local name, in any
  namespace and, to be safe, any letter case;
- an attribute whose name begins with `on`: its local name begins with `on` in any letter case;
- a reference to anything outside the file: a `href` (in any namespace, `xlink:href` included),
  `src` or `xml:base` attribute whose value does not begin with `#`; a `url(...)` in an attribute
  or in text (a `style` SVG element's) whose target does not begin with `#`; an `@import` in an
  attribute or text; a document type declaration or an entity declaration (either can name an
  outside file); a processing instruction other than the XML declaration (an `xml-stylesheet`,
  for one); and a namespace declaration naming anything but the SVG namespace
  `http://www.w3.org/2000/svg` or the XLink namespace `http://www.w3.org/1999/xlink`;
- a file that is no well-formed XML cannot be shown to hold none of these, and is flagged.

Covers: every such file; and a control: made-up SVG text holding each forbidden form in turn is
flagged, while made-up SVG text with both namespace declarations, an XML declaration, a `href`
and a `url()` to `#` targets inside the file, a `style` SVG element and a `fill` is not.

Does NOT cover: a reference in a form not listed above (a CSS `image-set()`, for one).
"""

import os
import re
import unittest
import xml.etree.ElementTree as ElementTree

import loop2_invariant_support as support

ICON_DIRECTORY = "assets/icons/"
ALLOWED_NAMESPACES = ("http://www.w3.org/2000/svg", "http://www.w3.org/1999/xlink")
NAMESPACE_DECLARATION = re.compile(r"\bxmlns(?::([\w.-]+))?\s*=\s*([\"'])(.*?)\2", re.S)
XML_DECLARATION = re.compile(r"^﻿?\s*<\?xml\s[^?]*\?>", re.S)
PROCESSING_INSTRUCTION = re.compile(r"<\?")
DECLARATIONS = re.compile(r"<!\s*(DOCTYPE|ENTITY)", re.I)
URL = re.compile(r"url\(\s*([\"']?)\s*([^\"')\s]*)", re.I)
IMPORT = re.compile(r"@import", re.I)
REFERENCE_ATTRIBUTES = ("href", "src", "base")


def local(name):
    return name.rsplit("}", 1)[-1]


def css_findings(where, text):
    found = []
    for match in URL.finditer(text):
        if not match.group(2).startswith("#"):
            found.append(f"{where} refers by url() to {match.group(2)!r}")
    if IMPORT.search(text):
        found.append(f"{where} holds an @import")
    return found


def findings(name, text):
    found = []
    for match in NAMESPACE_DECLARATION.finditer(text):
        if match.group(3) not in ALLOWED_NAMESPACES:
            found.append(f"{name} declares the namespace {match.group(3)!r}")
    if DECLARATIONS.search(text):
        found.append(f"{name} holds a document type or entity declaration")
    rest = XML_DECLARATION.sub("", text, count=1)
    if PROCESSING_INSTRUCTION.search(rest):
        found.append(f"{name} holds a processing instruction")
    try:
        root = ElementTree.fromstring(text.encode("utf-8"))
    except ElementTree.ParseError as error:
        return found + [f"{name} is no well-formed XML: {error}"]
    for element in root.iter():
        tag = local(element.tag) if isinstance(element.tag, str) else ""
        if tag.lower() in ("script", "foreignobject"):
            found.append(f"{name} holds a {tag} element")
        for attribute, value in element.attrib.items():
            attribute_name = local(attribute)
            where = f"{name} <{tag} {attribute_name}>"
            if attribute_name.lower().startswith("on"):
                found.append(f"{name} holds the attribute {attribute_name} on <{tag}>")
            if attribute_name.lower() in REFERENCE_ATTRIBUTES and \
                    not value.strip().startswith("#"):
                found.append(f"{where} refers to {value!r}")
            found += css_findings(where, value)
        for piece in (element.text, element.tail):
            if piece:
                found += css_findings(f"{name} text in <{tag}>", piece)
    return found


SVG = "http://www.w3.org/2000/svg"
XLINK = "http://www.w3.org/1999/xlink"


def svg(inner, extra=""):
    return f'<svg xmlns="{SVG}" viewBox="0 0 512 512"{extra}>{inner}</svg>'


FLAGGED = (
    svg("<script>alert(1)</script>"),
    svg('<script xlink:href="#a"/>', f' xmlns:xlink="{XLINK}"'),
    svg("<SCRIPT>1</SCRIPT>"),
    svg("<foreignObject><div/></foreignObject>"),
    svg('<path d="M0 0" onload="x()"/>'),
    svg('<path d="M0 0" ONCLICK="x()"/>'),
    svg('<path d="M0 0" onmouseover="x()"/>'),
    svg('<image href="https://example.org/a.png"/>'),
    svg('<image xlink:href="other.svg"/>', f' xmlns:xlink="{XLINK}"'),
    svg('<use href="sprite.svg#a"/>'),
    svg('<image src="a.png"/>'),
    svg('<a href="javascript:x()"><path d="M0 0"/></a>'),
    svg('<g xml:base="https://example.org/"><path d="M0 0"/></g>'),
    svg('<path d="M0 0" style="fill: url(https://example.org/p.svg#g)"/>'),
    svg('<path d="M0 0" fill="url(other.svg#g)"/>'),
    svg("<style>@import 'https://example.org/a.css';</style>"),
    svg("<style>path { fill: url('data:image/png;base64,AAAA') }</style>"),
    svg('<path d="M0 0"/>', ' xmlns:ev="http://www.w3.org/2001/xml-events"'),
    '<?xml version="1.0"?>\n<!DOCTYPE svg SYSTEM "https://example.org/svg.dtd">\n'
    + svg('<path d="M0 0"/>'),
    '<!DOCTYPE svg [<!ENTITY a SYSTEM "file:///etc/passwd">]>' + svg("<path d='M0 0'/>"),
    '<?xml version="1.0"?><?xml-stylesheet href="a.css"?>' + svg('<path d="M0 0"/>'),
    svg('<path d="M0 0">'),
)
CLEAN = (
    '<?xml version="1.0" encoding="UTF-8"?>\n'
    + svg('<defs><linearGradient id="g"><stop offset="0"/></linearGradient>'
          '<path id="p" d="M0 0h10v10z"/></defs>'
          '<style>path { fill: url(#g); }</style>'
          '<use href="#p"/><use xlink:href="#p"/>'
          '<path fill="#2b2b2b" style="fill: url( #g ); stroke: none" d="M0 0h512v512H0z"/>'
          '<text>one</text>',
          f' xmlns:xlink="{XLINK}"')
)


class IconFileContent(unittest.TestCase):

    def test_icon_files_hold_nothing_that_runs_or_refers_outside(self):
        # invariant: icon-file-content/1
        files = [p for p in support.listed_files()
                 if p.startswith(ICON_DIRECTORY) and "/" not in p[len(ICON_DIRECTORY):]
                 and p.lower().endswith(".svg")]
        self.assertTrue(files, f"the working tree holds no SVG file in {ICON_DIRECTORY}")
        found = []
        for relative in files:
            found += findings(relative, support.read_text(os.path.join(support.ROOT, relative)))
        self.assertEqual(found, [])

    def test_control_the_scan_flags_each_forbidden_form(self):
        # invariant: icon-file-content/1
        for text in FLAGGED:
            with self.subTest(svg=text):
                self.assertTrue(findings("probe.svg", text), f"the scan does not flag {text!r}")
        self.assertEqual(findings("probe.svg", CLEAN), [], "the scan flags a clean icon")


if __name__ == "__main__":
    unittest.main()
