# Akeed Photo Collage

## Installation

```
npm install akeed-photo-collage
```

## Props

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th style="width: 100px;">Name</th>
      <th style="width: 50px;">Type</th>
      <th style="width: 50px;">Required</th>
      <th style="width: 50px;">Default</th>
      <th style="width: 50px;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>width</td>
      <td>string</td>
      <td>false</td>
      <td>800px</td>
      <td></td>
    </tr>
    <tr>
      <td>height</td>
      <td>an array of strings</td>
      <td>false</td>
      <td>[]</td>
      <td></td>
    </tr>
    <tr>
      <td>layout</td>
      <td>an array of strings</td>
      <td>true</td>
      <td>[]</td>
      <td></td>
    </tr>
    <tr>
      <td>photos</td>
      <td>an array of strings</td>
      <td>true</td>
      <td>[]</td>
      <td></td>
    </tr>
    <tr>
      <td>showNumOfRemainingPhotos</td>
      <td>boolean</td>
      <td>true</td>
      <td>false</td>
      <td></td>
    </tr>
    <tr>
      <td>ofText</td>
      <td>string</td>
      <td>false</td>
      <td>of</td>
      <td></td>
    </tr>
  </tbody>
</table>

## Usage

```js
import { AkeedPhotoCollage } from "akeed-photo-collage";

const setting = {
  width: "600px",
  height: ["250px", "170px"],
  layout: [1, 4],
  photos: [
    { source: "url/image-1.jpg" },
    { source: "url/image-2.jpg" },
    { source: "url/image-3.jpg" },
    { source: "url/image-4.jpg" },
    { source: "url/image-5.jpg" },
    { source: "url/image-6.jpg" },
  ],
  showNumOfRemainingPhotos: true,
  ofText: "of",
};

function App() {
  return <AkeedPhotoCollage {...setting} />;
}
```

## Development

```
npm install
npm run demo
```
