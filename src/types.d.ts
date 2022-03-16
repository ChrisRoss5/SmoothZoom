type ActivationKey = "rightClick" | "altKey" | "ctrlKey" | "shiftKey";

interface ChromeStorage {
  activationKey: ActivationKey;
  websiteInteractivity: boolean;
  holdToZoom: boolean;
  useScreenshot: boolean;
  strength: number;
  transition: number;
}

type DefaultStorage = {
  activationKey: "rightClick";
  websiteInteractivity: true;
  holdToZoom: true;
  useScreenshot: false;
  strength: 1;
  transition: 200;
};