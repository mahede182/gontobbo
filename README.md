![Gontobbo Banner]()

At Gontobbo.co, every reservation is instantly confirmed. When you find your perfect stay, a few clicks are all it takes.

## Web system

Url: https://www.gontobbo.co/

## API Docs

API Documentation: https://devapi.gontobbo.co/documentation/v1.0.0#

## Styles Guide

https://www.figma.com/design/7P9n2uJaN7rPecgwr8stoY/Gontobbo-App-Design?node-id=23-2&t=tpfikUyNtM991vUi-0

- Spacing should be consistent and whitespace thought of as a first class technique up there with color and typefaces.
- Should be used for borders widths, margins, paddings.
- Should be used no color literals
- Raw text should not be used; instead, use the i18n way
- should used image from @theme/images

```ts
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";

const styles = StyleSheet.create({
 styleName : {
    fontFamily: typography['fontName'],
    fontSize: 26,
    fontWeight: "600",
    color: colors.white,
 }
}

```

```ts
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/@types/theme.type";

const   ComponentName = (props: Props) => {
    const { images } = useTheme<Theme>();
    return(
    ...
    <Image source={images.imageName} />
    ...
    )
}
```

```ts
    //localization/EN/en.ts
    ...
    common: {
        gontobbo: "Gontobbo",
        ...
    }
    // ComponentName.tsx
    import { useTranslation } from "react-i18next";
    ...
    const { t } = useTranslation();
    ...
    <RestyleText>{t("common.gontobbo")}</RestyleText>

```

## Fonts:

So here’s the hierarchy:

- Launch screen header ("Gontobbo"): Poppins-Bold
- Everything else: Poppins-Regular

### Adding a new font

1. Find .ttf on Google Fonts
2. Add to `src/assets/fonts`
3. Place with `app.config.ts` expo.plugins.font

## Setup & Run Locally:

### Clone repository

```
git clone https://github.com/rafser01/gontobbo_mobile_app.git
```

### Change directory

```
cd gontobbo
```

### Install dependencies

```
yarn
```

### Run Server

```
yarn start
```

Note: Use OTP in command line for verification code

## Internal / Staging Testing

Continue...

### Android Internal Testing

1. Open Android Studio
2. Build -> Generate Signed Bundle
3. Select keystore `my-release-key.keystore`
4. Select `stagingRelease` variant
5. Create new internal testing release in Google Play
6. Add this build and rollout to internal testing group

### iOS Internal Testing

1. Open xCode
2. Select Gather (Staging) scheme
3. Product -> Archive
4. Distribute to Testflight
5. Add internal testing group on Testflight

## Production Builds

## Android Production Build

1. Open Android Studio
2. Build -> Generate Signed Bundle
3. Select keystore `my-release-key.keystore`
4. Select `productionRelease` variant
5. Create new internal testing release in Google Play
6. Add this build and rollout to internal testing group

### IOS Production Build

1. Open xCode
2. Select Gather scheme
3. Product -> Archive
4. Distribute to Testflight
5. Add internal testing group on Testflight

## OTA Deploy (TBD)

Pushes app over the air to user's phone. Good when you don't need to notify user of change and/or we need to update the Expo SDK.

```
eas update --branch production --message "test expo publish"
```

Publishing to `prod` release channel is the ONLY way the app will connect to our production BE

## App Structure

We defined the following structure to work

| Folder               | Business Logic                            |
| -------------------- | ----------------------------------------- |
| assets               | for core-image,fonts                      |
| src/assets           | for figma design used images              |
| modules              | for work with native modules              |
| components           | for reusable components                   |
| screenName/component | for screen specific component             |
| config               | for config firebase,google,facebook etc   |
| data                 | for dummy hardcode data                   |
| localization         | for use i18n                              |
| machine              | for x-state management logic              |
| constants            | for constant variables                    |
| api                  | for service logic                         |
| contexts             | for consumable states                     |
| hooks                | for custom hooks                          |
| @types               | for the global interface and types        |
| navigation           | for the navigation stack for every module |
| screens              | for all app screen                        |
| theme                | for styles and @shopify/restyle set up    |
| utils                | for reusable useful code                  |

### Components

For create a screen, layout or reusable component we need to follow the next structure

- Screen Name

  - ComponentName

  - ComponentName.tsx (React Native Component)

![carbon (1)]()

- index.ts (For export)

![carbon (3)](https://user-images.githubusercontent.com/19823989/140749679-1c28da42-9155-4e5e-8ced-fe3163705fde.png)

## Contributing

We welcome contributions! Here are the steps:

1. Fork the repo and create a new branch.
2. Make your changes and ensure tests pass.
3. Add new tests for new features/changes.
4. Update docs if needed.
5. Submit a pull request with a clear description.

For major changes, open an issue first to discuss.

# PUSH NOTIFICATION Configuration for production and staging

Changes required in following files:
