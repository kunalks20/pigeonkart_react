import {
  MangoIcon, GarlicIcon, LemonIcon, ChilliIcon, VeggieIcon,
  SevIcon, DalIcon, ChivdaIcon, PeanutIcon
} from '../components/icons.jsx'

// Product id -> icon component. Add an entry here whenever a new product id
// is added to the catalog (frontend data.js / backend seed).
export const PRODUCT_ICONS = {
  '1': SevIcon,
  '2': DalIcon,
  '3': ChivdaIcon,
  '4': PeanutIcon,
  '5': MangoIcon,
  '6': VeggieIcon,
  '7': LemonIcon,
  '8': ChilliIcon,
  '9': GarlicIcon
}

// Icons shown in the decorative banner strip at the top of each Shop tab.
export const TAB_BANNER_ICONS = {
  namkin: [SevIcon, DalIcon, ChivdaIcon, PeanutIcon],
  achar: [MangoIcon, GarlicIcon, LemonIcon, ChilliIcon]
}