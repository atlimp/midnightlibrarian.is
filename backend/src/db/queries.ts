export const GET_CONFIG = 'SELECT doi_date, doi_message, doi_countdown, motd, show_additional_content FROM CONFIG WHERE config_id = $configId';
export const GET_ALL_LINKS = 'SELECT site, link, svg, active FROM LINK';
export const GET_ALL_ACTIVE_LINKS = 'SELECT site, link, svg, active FROM LINK WHERE active = 1';
export const GET_LINK = 'SELECT site, link, svg, active FROM LINK WHERE site = $site';
export const GET_ALL_RELEASES = 'SELECT t1.id, t1.name, t1.description, t2.type, t1.image, t1.active, t1.release_date FROM RELEASE t1 JOIN RELEASETYPE t2 ON t1.type = t2.id';
export const GET_ALL_ACTIVE_RELEASES = 'SELECT t1.id, t1.name, t1.description, t2.type, t1.image, t1.active, t1.release_date FROM RELEASE t1 JOIN RELEASETYPE t2 ON t1.type = t2.id WHERE t1.active = 1';
export const GET_RELEASE = 'SELECT t1.id, t1.name, t2.type, t1.description, t1.image, t1.active, t1.release_date FROM RELEASE t1 JOIN RELEASETYPE t2 ON t1.type = t2.id WHERE t1.id = $id';
export const GET_RELEASE_LINKS = 'SELECT site, link FROM RELEASELINK WHERE release = $release';
export const GET_RANDOM_QUOTE = 'SELECT quote FROM QUOTE ORDER BY RANDOM() LIMIT 1';