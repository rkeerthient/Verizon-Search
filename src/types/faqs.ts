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

export enum C_typeOfFAQ {
	GENERAL_FAQ = "General FAQ",
	PRODUCT_SUPPORT = "Product Support",
}

export default interface Faq {
	answerV2?: any,
	landingPageUrl?: string,
	nudgeEnabled?: boolean,
	primaryConversationContact?: any,
	question: string,
	slug?: string,
	logo?: ComplexImage,
	name: string,
	c_activeOnAnswers?: boolean,
	c_answersKeywords?: string[],
	c_floatingNavigation?: boolean,
	c_newLandingPageURL?: string,
	c_primaryCTA?: C_primaryCTA,
	c_productCategory?: string[],
	c_secondaryCTA?: C_secondaryCTA,
	c_typeOfFAQ?: C_typeOfFAQ,
	keywords?: string[],
	id: string,
	timezone?: any,
}
