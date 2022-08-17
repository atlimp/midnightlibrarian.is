// CONFIG
export const GET_CONFIG = 'SELECT doi_date, doi_message, doi_countdown, motd, show_additional_content FROM CONFIG WHERE config_id = $configId';
export const UPDATE_CONFIG = 'UPDATE CONFIG set doi_date = $doi_date, doi_message = $doi_message, doi_countdown = $doi_countdown, motd = $motd, show_additional_content = $show_additional_content WHERE config_id = $config_id';

// LINKS
export const GET_ALL_LINKS = 'SELECT site, link, svg, active FROM LINK';
export const GET_ALL_ACTIVE_LINKS = 'SELECT site, link, svg, active FROM LINK WHERE active = 1';
export const GET_LINK = 'SELECT site, link, svg, active FROM LINK WHERE site = $site';
export const GET_INSERTED_LINK = 'SELECT site, link, svg, active FROM LINK WHERE rowid = last_insert_rowid()';
export const INSERT_LINK = 'INSERT INTO LINK(site, link, svg, active) VALUES($site, $link, $svg, $active)';
export const UPDATE_LINK = 'UPDATE LINK set link = $link, svg = $svg, active = $active where site = $site';
export const DELETE_LINK = 'DELETE FROM LINK WHERE site = $site';

// RELEASES
export const GET_ALL_RELEASES = 'SELECT t1.id, t1.name, t1.description, t2.type, t1.image, t1.active, t1.release_date FROM RELEASE t1 JOIN RELEASETYPE t2 ON t1.type = t2.id';
export const GET_ALL_ACTIVE_RELEASES = 'SELECT t1.id, t1.name, t1.description, t2.type, t1.image, t1.active, t1.release_date FROM RELEASE t1 JOIN RELEASETYPE t2 ON t1.type = t2.id WHERE t1.active = 1';
export const GET_RELEASE = 'SELECT t1.id, t1.name, t2.type, t1.description, t1.image, t1.active, t1.release_date FROM RELEASE t1 JOIN RELEASETYPE t2 ON t1.type = t2.id WHERE t1.id = $id';
export const GET_RELEASE_LINKS = 'SELECT site, link FROM RELEASELINK WHERE release = $release';
export const GET_RELEASE_TYPES = 'SELECT id, type FROM RELEASETYPE WHERE release = $release';

// QUOTES
export const GET_RANDOM_QUOTE = 'SELECT quote FROM QUOTE ORDER BY RANDOM() LIMIT 1';

// MEMBERS
export const GET_MEMBERS = 'SELECT id, name, role, description, image FROM MEMBER';
export const GET_MEMBER = 'SELECT id, name, role, description, image FROM MEMBER WHERE id = $id';
export const INSERT_MEMBER = 'INSERT INTO MEMBER(name, role, description, image) VALUES($name, $role, $description, $image)';
export const UPDATE_MEMBER = 'UPDATE MEMBER SET name = $name, role = $role, description = $description, image= $image WHERE id = $id';

// OTHER
export const BEGIN_TRANSACTION = 'BEGIN TRANSACTION';
export const COMMIT_TRANSACTION = 'COMMIT';
export const ROLLBACK_TRANSACTION = 'ROLLBACK';