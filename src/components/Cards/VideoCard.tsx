import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import YouTube from "react-youtube";
import Youtube_video from "../../types/videos";
import YoutubeIframe from "../YoutubeIframe";

export function VideoCard(props: CardProps<Youtube_video>): JSX.Element {
  const { result } = props;
  const optsMob = {
    height: "270",
    width: "320",
  };
  const optsDesk = {
    height: "270",
    width: "380",
  };
  const _onReady = (e: any) => {
    e.target.pauseVideo();
  };

  return (
    <div className="flex flex-col justify-between border rounded-lg mb-4 shadow-sm">
      {/* <span className="block md:hidden">
        <YouTube
          videoId={result.rawData.youtube_videoURL?.split("v=")[1]}
          onReady={_onReady}
          opts={optsMob}
          className="border "
        />
      </span>
      <span className="hidden md:block">
        <YouTube
          videoId={result.rawData.youtube_videoURL?.split("v=")[1]}
          onReady={_onReady}
          opts={optsDesk}
          className="border "
        />
      </span> */}
      <YoutubeIframe
        videoId={result.rawData.youtube_videoURL?.split("v=")[1]}
      />

      <div className="p-5">
        <p className="text-xl font-bold ">{result.name}</p>
        <p className="mt-4">Posted - {result.rawData.youtube_publishedAt}</p>
        <p className="mt-4">Description: {result.description}</p>
      </div>
    </div>
  );
}
