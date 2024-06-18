# zero setup toaster library for HTMX

- 2.5kb gzipped ( 4kb with IE11 support)
- language agnostic
- no build steps
- customizable theme
- Swipe to dismiss gesture
- Automatic dismiss after 5s
- Max 3 toasts can be visible at one time

## Installation

### Download a copy

```html
<script defer src="./htmx-toaster.min.js"></script>
```

### Via a CDN

```html
<script defer src="https://unpkg.com/htmx-toaster@0.0.9/dist/htmx-toaster.min.js"></script>
```

IE11 Compatible version

```html
<script defer src="https://unpkg.com/htmx-toaster@0.0.9/dist/htmx-toaster.ie11.min.js"></script>
```

## Usage

### Toast are triggered by setting the following Response Headers on the server

`HXToaster-Body` - sets the body of the toast

```go
w.Header().Set("HXToaster-Body", "This is the text that will show up in the body of the toast")
```

`HXToaster-Type` - optional parameter to choose type of toast

```js
//  "default", "success", "info", "error"
w.Header().Set("HXToaster-Type", "success");
```

## Customize theme

an additional property `data-htmxt-colors` can be added to the script to customize the theme

add your colors in the following order

`DEFAULT`;`TEXT`;`SUCCESS`;`INFO`;`ERROR`

```html
<!-- example with all custom colors -->
<script defer src="..." data-htmxt-colors="grey;black;green;blue;red"></script>
```

if you want to leave a certain color leave as empty and it will use the default theme

```html
<!-- example using the default text color -->
<script defer src="..." data-htmxt-colors="grey;;green;blue;red"></script>
```
