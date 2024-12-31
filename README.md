<p align="center">
<h3 align="center">
  💬 Expo Gifted Chat
</h3>
<p align="center">
  The most complete chat UI for React Native & Web
</p>

## Attribution

This package is a fork of [react-native-gifted-chat](https://github.com/FaridSafi/react-native-gifted-chat) with the following key improvements:

- Removed unstable react-native-reanimated dependency for more reliable keyboard handling
- Replaced FlatList with FlashList for better performance
- Fixed Android keyboard issues including blank space problems

## Key Changes

1. **Keyboard Handling**: Removed react-native-reanimated dependency which was causing keyboard height calculation issues on Android
2. **Performance**: Migrated from FlatList to FlashList for improved scrolling and rendering performance
3. **Bug Fixes**: Resolved Android keyboard blank space issues

## Performance Benefits

- Up to 5x faster list rendering with FlashList
- More reliable keyboard behavior on Android
- Reduced bundle size by removing reanimated dependency

## Features

- Write with **TypeScript**
- Fully customizable components
- Composer actions (to attach photos, etc.)
- Load earlier messages
- Copy messages to clipboard
- Touchable links using [react-native-parsed-text](https://github.com/taskrabbit/react-native-parsed-text)
- Avatar as user's initials
- Localized dates
- Multi-line TextInput
- InputToolbar avoiding keyboard
- Redux support
- System message
- Quick Reply messages (bot)
- Typing indicator
- Supports react-native-web

# Getting started

## Installation

### Install dependencies

Yarn:

```bash
yarn add expo-gifted-chat react-native-keyboard-controller react-native-safe-area-context react-native-get-random-values
```

Npm:

```bash
npm install --save expo-gifted-chat react-native-keyboard-controller react-native-safe-area-context react-native-get-random-values
```

Expo

```bash
npx expo install expo-gifted-chat react-native-keyboard-controller react-native-safe-area-context react-native-get-random-values
```

### Non-expo users

```bash
npx pod-install
```

### Setup react-native-safe-area-context

Follow guide: [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context?tab=readme-ov-file#api)

### react-native-video and expo-av

- Both dependencies are removed since `0.11.0`.
- You still be able to provide a `video` but you need to provide `renderMessageVideo` prop.

## Testing

`TEST_ID` is exported as constants that can be used in your testing library of choice

Gifted Chat uses `onLayout` to determine the height of the chat container. To trigger `onLayout` during your tests, you can run the following bits of code.

```typescript
const WIDTH = 200 // or any number
const HEIGHT = 2000 // or any number

const loadingWrapper = getByTestId(TEST_ID.LOADING_WRAPPER)
fireEvent(loadingWrapper, 'layout', {
  nativeEvent: {
    layout: {
      width: WIDTH,
      height: HEIGHT,
    },
  },
})
```

## Example

```jsx
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'expo-gifted-chat'

export function Example() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    )
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  )
}
```

## Message object

```ts
export interface IMessage {
  _id: string | number
  text: string
  createdAt: Date | number
  user: User
  image?: string
  video?: string
  audio?: string
  system?: boolean
  sent?: boolean
  received?: boolean
  pending?: boolean
  quickReplies?: QuickReplies
}
```

```js
{
  _id: 1,
  text: 'My message',
  createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
  user: {
    _id: 2,
    name: 'React Native',
    avatar: 'https://facebook.github.io/react/img/logo_og.png',
  },
  image: 'https://facebook.github.io/react/img/logo_og.png',
  // You can also add a video prop:
  video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  // Mark the message as sent, using one tick
  sent: true,
  // Mark the message as received, using two tick
  received: true,
  // Mark the message as pending with a clock loader
  pending: true,
  // Any additional custom parameters are passed through
}
```

> e.g. System Message

```js
{
  _id: 1,
  text: 'This is a system message',
  createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
  system: true,
  // Any additional custom parameters are passed through
}
```

> e.g. Chat Message with Quick Reply options

```ts
interface Reply {
  title: string
  value: string
  messageId?: number | string
}

interface QuickReplies {
  type: 'radio' | 'checkbox'
  values: Reply[]
  keepIt?: boolean
}
```

```js
  {
    _id: 1,
    text: 'This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT',
    createdAt: new Date(),
    quickReplies: {
      type: 'radio', // or 'checkbox',
      keepIt: true,
      values: [
        {
          title: '😋 Yes',
          value: 'yes',
        },
        {
          title: '📷 Yes, let me show you with a picture!',
          value: 'yes_picture',
        },
        {
          title: '😞 Nope. What?',
          value: 'no',
        },
      ],
    },
    user: {
      _id: 2,
      name: 'React Native',
    },
  },
  {
    _id: 2,
    text: 'This is a quick reply. Do you love Gifted Chat? (checkbox)',
    createdAt: new Date(),
    quickReplies: {
      type: 'checkbox', // or 'radio',
      values: [
        {
          title: 'Yes',
          value: 'yes',
        },
        {
          title: 'Yes, let me show you with a picture!',
          value: 'yes_picture',
        },
        {
          title: 'Nope. What?',
          value: 'no',
        },
      ],
    },
    user: {
      _id: 2,
      name: 'React Native',
    },
  }
```

## Props

- **`messageContainerRef`** _(FlashList ref)_ - Ref to the flashList
- **`textInputRef`** _(TextInput ref)_ - Ref to the text input
- **`messages`** _(Array)_ - Messages to display
- **`isTyping`** _(Bool)_ - Typing Indicator state; default `false`. If you use`renderFooter` it will override this.
- **`text`** _(String)_ - Input text; default is `undefined`, but if specified, it will override GiftedChat's internal state (e.g. for redux; [see notes below](#notes-for-redux))
- **`placeholder`** _(String)_ - Placeholder when `text` is empty; default is `'Type a message...'`
- **`messageIdGenerator`** _(Function)_ - Generate an id for new messages. Defaults to UUID v4, generated by [uuid](https://github.com/kelektiv/node-uuid)
- **`user`** _(Object)_ - User sending the messages: `{ _id, name, avatar }`
- **`onSend`** _(Function)_ - Callback when sending a message
- **`alwaysShowSend`** _(Bool)_ - Always show send button in input text composer; default `false`, show only when text input is not empty
- **`locale`** _(String)_ - Locale to localize the dates. You need first to import the locale you need (ie. `require('dayjs/locale/de')` or `import 'dayjs/locale/fr'`)
- **`timeFormat`** _(String)_ - Format to use for rendering times; default is `'LT'` (see [Day.js Format](https://day.js.org/docs/en/display/format))
- **`dateFormat`** _(String)_ - Format to use for rendering dates; default is `'ll'` (see [Day.js Format](https://day.js.org/docs/en/display/format))
- **`loadEarlier`** _(Bool)_ - Enables the "load earlier messages" button, required for `infiniteScroll`
- **`onLoadEarlier`** _(Function)_ - Callback when loading earlier messages
- **`isLoadingEarlier`** _(Bool)_ - Display an `ActivityIndicator` when loading earlier messages
- **`renderLoading`** _(Function)_ - Render a loading view when initializing
- **`renderLoadEarlier`** _(Function)_ - Custom "Load earlier messages" button
- **`renderAvatar`** _(Function)_ - Custom message avatar; set to `null` to not render any avatar for the message
- **`showUserAvatar`** _(Bool)_ - Whether to render an avatar for the current user; default is `false`, only show avatars for other users
- **`showAvatarForEveryMessage`** _(Bool)_ - When false, avatars will only be displayed when a consecutive message is from the same user on the same day; default is `false`
- **`onPressAvatar`** _(Function(`user`))_ - Callback when a message avatar is tapped
- **`onLongPressAvatar`** _(Function(`user`))_ - Callback when a message avatar is long-pressed
- **`renderAvatarOnTop`** _(Bool)_ - Render the message avatar at the top of consecutive messages, rather than the bottom; default is `false`
- **`renderBubble`** _(Function)_ - Custom message bubble
- **`renderTicks`** _(Function(`message`))_ - Custom ticks indicator to display message status
- **`renderSystemMessage`** _(Function)_ - Custom system message
- **`onPress`** _(Function(`context`, `message`))_ - Callback when a message bubble is pressed
- **`onLongPress`** _(Function(`context`, `message`))_ - Callback when a message bubble is long-pressed
- **`inverted`** _(Bool)_ - Reverses display order of `messages`; default is `true`
- **`renderUsernameOnMessage`** _(Bool)_ - Indicate whether to show the user's username inside the message bubble; default is `false`
- **`renderUsername`** _(Function)_ - Custom Username container
- **`renderMessage`** _(Function)_ - Custom message container
- **`renderMessageText`** _(Function)_ - Custom message text
- **`renderMessageImage`** _(Function)_ - Custom message image
- **`renderMessageVideo`** _(Function)_ - Custom message video
- **`imageProps`** _(Object)_ - Extra props to be passed to the [`<Image>`](https://facebook.github.io/react-native/docs/image.html) component created by the default `renderMessageImage`
- **`videoProps`** _(Object)_ - Extra props to be passed to the video component created by the required `renderMessageVideo`
- **`lightboxProps`** _(Object)_ - Extra props to be passed to the `MessageImage`'s [Lightbox](https://github.com/oblador/react-native-lightbox)
- **`isCustomViewBottom`** _(Bool)_ - Determine whether renderCustomView is displayed before or after the text, image and video views; default is `false`
- **`renderCustomView`** _(Function)_ - Custom view inside the bubble
- **`renderDay`** _(Function)_ - Custom day above a message
- **`renderTime`** _(Function)_ - Custom time inside a message
- **`renderFooter`** _(Function)_ - Custom footer component on the ListView, e.g. `'User is typing...'`; see [App.tsx](/example/App.tsx) for an example. Overrides default typing indicator that triggers when `isTyping` is true.
- **`renderChatEmpty`** _(Function)_ - Custom component to render in the ListView when messages are empty
- **`renderChatFooter`** _(Function)_ - Custom component to render below the MessageContainer (separate from the ListView)
- **`renderInputToolbar`** _(Function)_ - Custom message composer container
- **`renderComposer`** _(Function)_ - Custom text input message composer
- **`renderActions`** _(Function)_ - Custom action button on the left of the message composer
- **`renderSend`** _(Function)_ - Custom send button; you can pass children to the original `Send` component quite easily, for example, to use a custom icon
- **`renderAccessory`** _(Function)_ - Custom second line of actions below the message composer
- **`onPressActionButton`** _(Function)_ - Callback when the Action button is pressed (if set, the default `actionSheet` will not be used)
- **`bottomOffset`** _(Integer)_ - Distance of the chat from the bottom of the screen (e.g. useful if you display a tab bar)
- **`minInputToolbarHeight`** _(Integer)_ - Minimum height of the input toolbar; default is `44`
- **`listViewProps`** _(Object)_ - Extra props to be passed to the messages [`<ListView>`](https://facebook.github.io/react-native/docs/listview.html); some props can't be overridden, see the code in `MessageContainer.render()` for details
- **`textInputProps`** _(Object)_ - Extra props to be passed to the [`<TextInput>`](https://facebook.github.io/react-native/docs/textinput.html)
- **`textInputStyle`** _(Object)_ - Custom style to be passed to the [`<TextInput>`](https://facebook.github.io/react-native/docs/textinput.html)
- **`multiline`** _(Bool)_ - Indicates whether to allow the [`<TextInput>`](https://facebook.github.io/react-native/docs/textinput.html) to be multiple lines or not; default `true`.
- **`keyboardShouldPersistTaps`** _(Enum)_ - Determines whether the keyboard should stay visible after a tap; see [`<ScrollView>`](https://facebook.github.io/react-native/docs/scrollview.html) docs
- **`onInputTextChanged`** _(Function)_ - Callback when the input text changes
- **`maxInputLength`** _(Integer)_ - Max message composer TextInput length
- **`parsePatterns`** _(Function)_ - Custom parse patterns for [react-native-parsed-text](https://github.com/taskrabbit/react-native-parsed-text) used to linking message content (like URLs and phone numbers), e.g.:

```js
 <GiftedChat
   parsePatterns={(linkStyle) => [
     { type: 'phone', style: linkStyle, onPress: this.onPressPhoneNumber },
     { pattern: /#(\w+)/, style: { ...linkStyle, styles.hashtag }, onPress: this.onPressHashtag },
   ]}
 />
```

- **`extraData`** _(Object)_ - Extra props for re-rendering FlashList on demand. This will be useful for rendering footer etc.
- **`minComposerHeight`** _(Object)_ - Custom min-height of the composer.
- **`maxComposerHeight`** _(Object)_ - Custom max height of the composer.

* **`scrollToBottom`** _(Bool)_ - Enables the scroll to bottom Component (Default is false)
* **`scrollToBottomComponent`** _(Function)_ - Custom Scroll To Bottom Component container
* **`scrollToBottomOffset`** _(Integer)_ - Custom Height Offset upon which to begin showing Scroll To Bottom Component (Default is 200)
* **`scrollToBottomStyle`** _(Object)_ - Custom style for Bottom Component container
* **`alignTop`** _(Boolean)_ Controls whether or not the message bubbles appear at the top of the chat (Default is false - bubbles align to bottom)
* **`onQuickReply`** _(Function)_ - Callback when sending a quick reply (to backend server)
* **`renderQuickReplies`** _(Function)_ - Custom all quick reply view
* **`quickReplyStyle`** _(StyleProp<ViewStyle>)_ - Custom quick reply view style
* **`renderQuickReplySend`** _(Function)_ - Custom quick reply **send** view
* **`shouldUpdateMessage`** _(Function)_ - Lets the message component know when to update outside of normal cases.
* **`infiniteScroll`** _(Bool)_ - infinite scroll up when reach the top of messages container, automatically call onLoadEarlier function if exist (not yet supported for the web). You need to add `loadEarlier` prop too.
* **`isStatusBarTranslucentAndroid`** _(Bool)_ - If you use translucent status bar on Android, set this option to true. Ignored on iOS.

## License

- [MIT](LICENSE)
