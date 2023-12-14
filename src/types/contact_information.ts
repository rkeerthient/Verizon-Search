export enum LinkType {
	OTHER = "Other",
	URL = "URL",
	PHONE = "Phone",
	EMAIL = "Email",
}

export interface C_primaryCTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export interface C_secondaryCTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export enum C_websiteSource {
	VERIZON_COM_BUSINESS_ = "Verizon.com/business/",
	VERIZONCONNECT_COM = "Verizonconnect.com",
	VERIZON_COM_ABOUT_ = "Verizon.com/about/",
}

export default interface Ce_contactInformation {
	landingPageUrl?: string,
	richTextDescriptionV2?: any,
	name: string,
	c_activeOnAnswers?: boolean,
	c_answersKeywords?: string[],
	c_folderLevel1?: string,
	c_folderLevel2?: string,
	c_gBPTrackingCode?: string,
	c_lineOfBusiness1?: string,
	c_primaryCTA?: C_primaryCTA,
	c_secondaryCTA?: C_secondaryCTA,
	c_vBGAnswers?: boolean,
	c_vCGAnswers?: boolean,
	c_websiteSource?: C_websiteSource,
	id: string,
}
