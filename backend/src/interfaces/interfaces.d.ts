import { Router } from 'express';

export interface IBaseController {
}

export interface IBaseRouter {
    initRoutes(): any;
    initMiddleware(): any;
    path: string;
    router: Router;
}

export interface IBaseService {

}

export interface DateOfInterest {
    date: Date;
    message: string;
    countdown: boolean;
}

export interface Link {
    site: string;
    link: string;
    svg: string;
    active: boolean;
}

export interface ReleaseLink {
    site: string;
    link: string;
}

export interface Release {
    id: int;
    name: string;
    description: string;
    type: string;
    links: ReleaseLink[];
    image: string;
    active: boolean;
    releaseDate: Date;
}

export interface Doi {
    date: Date;
    message: string;
    countdown: boolean;
}

export interface Config {
    doi: Doi;
    motd: string;
    showAdditionalContent: boolean;
}

export interface Quote {
    quote: string;
}

export interface Member {
    id: number;
    name: string;
    role: string;
    description: string;
    image: string;
}