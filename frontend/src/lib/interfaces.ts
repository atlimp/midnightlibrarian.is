export interface DateOfInterest {
    message: string;
    date: Date;
    countdown: boolean;
}

export interface Config {
    dateOfInterest: DateOfInterest;
    messageOfTheDay: string;
    showAdditionalContent: boolean;
}

export interface Link {
    site: string;
    link: string;
    svg: string;
    active: boolean;
}

export interface Release {
    name: string;
    type: string;
    links: Link[];
    image: string;
    active: boolean;
    description: string;
    releaseDate: Date;
}