# TextToSVG

This is my attempt to create a web tool which will convert a given Text into a SVG file for use in various places. Later we can improve it further.

Site is hosted on Github Pages: [https://fullstack-storyteller.github.io/TextToSVG/index.html](https://fullstack-storyteller.github.io/TextToSVG/index.html)

## Usage Notes

- Use in Either Latest version of Chrome or in Edge Vrowser for best experience.
- Enter text to encode into SVG
- Enter URL to encode into SVG (it is optional!)
- Select the formatting of your text within SVG
- Click on "Encode"
- The Testing Area will show how the SVG will look within a line

  - Since it is can't be determined the width fo a character of any font (However, the average is 16 pixels roughly), we are allowing user to adjust the SVG width mannually at the bottom left of the screen
  - A user can also control wether the link encoded within the svg is launch the hyperlink is same tab or different tab.

- The utility outputs the image darta url and also the svg xml to be used in various programming purposes.

## Some command for your local setup

1. Use `live-server` command from the Terminal in VS Code to run the server and see results in real time.

## Notes

Important Links:

1. Icon finder: https://www.iconfinder.com/search?q=clipboard&price=free
2. data url to image for viewing image preview: https://base64.guru/tools/data-url-to-image
3. Base64 to text: https://base64.guru/converter/decode/text
4. XML Pretty Print: https://jsonformatter.org/xml-pretty-print
5. SVG Details
   1. https://www.w3schools.com/graphics/svg_text.asp
   2. https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute
   3. https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-weight
   4. https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-size
   5. https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-style
   6. https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio
