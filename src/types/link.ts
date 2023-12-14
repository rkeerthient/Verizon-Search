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

export interface ComplexImage {
	image: Image,
	details?: string,
	description?: string,
	clickthroughUrl?: string,
}

export enum C_websiteSource {
	VERIZON_COM_BUSINESS_ = "Verizon.com/business/",
	VERIZONCONNECT_COM = "Verizonconnect.com",
	VERIZON_COM_ABOUT_ = "Verizon.com/about/",
}

export default interface Ce_link {
	bodyV2?: any,
	landingPageUrl: string,
	primaryPhoto?: ComplexImage,
	name: string,
	c_activeOnAnswers?: boolean,
	c_connectorName?: string,
	c_folderLevel1?: string,
	c_folderLevel2?: string,
	c_gBPTrackingCode?: string,
	c_vBGAnswers?: boolean,
	c_vCGAnswers?: boolean,
	c_vZConnectsCrawlerTest?: boolean,
	c_websiteSource?: C_websiteSource,
	id: string,
}
