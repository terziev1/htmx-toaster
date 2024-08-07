# zero-setup, customizable server-triggered notifications for HTMX

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
<script defer src="https://unpkg.com/htmx-toaster/dist/htmx-toaster.min.js"></script>
```

IE11 Compatible version

```html
<script defer src="https://unpkg.com/htmx-toaster/dist/htmx-toaster.ie11.min.js"></script>
```

### Install as npm package

```
npm install htmx-toaster --save
```

```js
import "htmx-toaster";
```

## Usage

### Triggering a toast from the server

#### Option 1: HX-Trigger with the `HXToast` event.

`HXToast` takes two keys

1. `body` - sets the body of the toast
2. `type` - optional parameter to choose type of toast

```go
// omitting type will render the default style
w.Header().Set("HX-Trigger", `{"HXToast":{"body":"This is the text that will show up in the body of the toast"}}`)
// type can be  "default", "success", "info", "error"
w.Header().Set("HX-Trigger", `{"HXToast":{"type":"success","body":"This is the text that will show up in the body of the toast"}}`)
```

#### Option 2: Custom HXToaster headers

`HXToaster-Body` - sets the body of the toast

```go
w.Header().Set("HXToaster-Body", "This is the text that will show up in the body of the toast")
```

`HXToaster-Type` - optional parameter to choose type of toast

```go
//  "default", "success", "info", "error"
w.Header().Set("HXToaster-Type", "success");
```

### Triggering toasts from the front end:

```html
<script>
  window.HTMXToastComponent.addToast("This is the text that will show up in the body of the toast", "info");
</script>
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
