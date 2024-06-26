import {Bookmark, Home, Send, Setting, Heart} from 'react-native-iconly';

const icons = {
  PlayIcon: 'play',
  loopIcon: 'repeat',
  ArrowLeftIcon: 'arrow-left',
  HeartIcon: 'heart',
  PauseIcon: 'pause',
  ShuffleIcon: 'random',
  ChevronLeftIcon: 'chevron-left',
  SquareXMark: 'square-xmark',
};

export const navIcons = {
  home: Home,
  playlist: Bookmark,
  share: Send,
  setting: Setting,
  heart: Heart,
};

export default icons;
