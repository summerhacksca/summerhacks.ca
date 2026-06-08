export type SlideId = 1 | 2 | 3;

export type Slide = {
	step: SlideId;
	title: string;
	numberLabel: string;
};

export type ApplicationFormData = {
	firstNameLegal: string;
	lastNameLegal: string;
	preferredName: string;
	age: string;
	gender: string;
	ethnicity: string;
	institutionName: string;
	yearOfStudy: string;
	linkedin: string;
	github: string;
	resumeLink: string;
	portfolioLink: string;
	proudProject: string;
	chooseOneAnswer: string;
	summerHacksGoal: string;
	rambleTopic: string;
	bearOrMuffin: string;
	offlineSelf: string;
	dietaryRestrictions: string;
	accessibilityNeeds: string;
	tshirtSize: string;
	travelToDowntownToronto: string;
};

export type FieldChangeHandler = (
	field: keyof ApplicationFormData,
	value: string,
) => void;
