import App from './app';
import ConfigRouter from './routers/configrouter';
import LinksRouter from './routers/linksrouter';
import QuoteRouter from './routers/quoterouter';
import ReleasesRouter from './routers/releasesrouter';
import MemberRouter from './routers/memberrouter';
import LoginRouter from './routers/loginrouter';
import UploadRouter from './routers/uploadrouter';
import { getConfigOrDefault } from './util/util';

const host: string = getConfigOrDefault('HOST', 'localhost');
const port: number = getConfigOrDefault('process.env.PORT', 3000, (x: string) => Number(x));


const app = new App({
    host,
    port,
    routers: [
        new ConfigRouter(),
        new LinksRouter(),
        new ReleasesRouter(),
        new QuoteRouter(),
        new MemberRouter(),
        new LoginRouter(),
        new UploadRouter(),
    ],
});

app.listen();
