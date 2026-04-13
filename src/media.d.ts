/*TypeScript cannot process media types, css files, so this notifies Typescript to treat importing a media file as string (the file path) */
declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}

declare module "*.gif" {
  const value: string;
  export default value;
}

declare module "*.webp" {
  const value: string;
  export default value;
}

declare module "*.mp4" {
  const value: string;
  export default value;
}

declare module "*.webm" {
  const value: string;
  export default value;
}

declare module "*.mov" {
  const value: string;
  export default value;
}

declare module "*.avi" {
  const value: string;
  export default value;
}

declare module "*.m4v" {
  const value: string;
  export default value;
}

declare module "*.ogv" {
  const value: string;
  export default value;
}

declare module "*.mkv" {
  const value: string;
  export default value;
}

declare module "*.css" {
  const content: string;
  export default content;
}

declare module "*.css" {
  const content: string;
  export default content;
}
