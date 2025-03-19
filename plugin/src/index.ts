import { withDangerousMod, ConfigPlugin } from 'expo/config-plugins';
import { mergeContents } from "@expo/config-plugins/build/utils/generateCode";

import fs from 'fs';
import path from 'path';

type ConfigArgs = {
  podfile: {
    tag: string;
    anchor: string | RegExp;
    offset: number;
    newSrc: string[];
    comment: string;
  };
};

async function readFileAsync(path: string) {
  return fs.promises.readFile(path, "utf8");
}

async function saveFileAsync(path: string, content: string) {
  return fs.promises.writeFile(path, content, "utf8");
}

function addPodSource(src: string, podConfig: any) {
  return mergeContents({
    tag: podConfig.tag || "expo-config-writer",
    src,
    newSrc: podConfig.newSrc ? podConfig.newSrc.join("\n") : "",
    anchor: podConfig.anchor || /^/,
    offset: podConfig.offset,
    comment: podConfig.comment || "#",
  }).contents;
}

const withConfigWriter: ConfigPlugin<ConfigArgs> = (c, args: ConfigArgs) => {
  // Merge Podfile
  c = withDangerousMod(c, [
    "ios",
    async config => {
      const file = path.join(config.modRequest.platformProjectRoot, "Podfile");
      const contents = await readFileAsync(file);
      const podfileConfig = args.podfile;
      await saveFileAsync(file, addPodSource(contents, podfileConfig));
      return config;
    }
  ]);

  return c;
};

export default withConfigWriter;