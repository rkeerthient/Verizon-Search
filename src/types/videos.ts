export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

export interface ComplexVideo {
	url: string,
	video?: string,
	description?: string,
}

export default interface Youtube_video {
	description?: string,
	name: string,
	youtube_channelID?: string,
	youtube_publishedAt?: string,
	youtube_thumbnailPhoto?: Image,
	youtube_videoURL?: string,
	id: string,
	videos?: ComplexVideo[],
}
