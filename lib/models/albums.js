const client = require('../db-client');

module.exports = {
    select(id) {
        return id ? this.selectOne(id) : this.selectAll();
    },
    selectAll() {
        return client.query('SELECT * FROM ALBUMS')
            .then(({ rows }) => rows);
    },
    selectOne(id) {
        return client.query(`
            SELECT * 
            FROM ALBUMS
            WHERE id = $1;
        `,
        [id]
        ).then(({ rows }) => rows[0]);
    },
    insert(album) {
        return client.query(`
            INSERT INTO albums (
                title, artist
            )
            VALUES ($1, $2)
            RETURNING *;
        `,
        [album.title, album.artist]
        ).then(({ rows }) => rows[0]);
    },
    update(album) {
        return client.query(`
            UPDATE Albums 
            SET    
                title = $1, 
                artist = $2
                
            WHERE id = $3
            RETURNING *;
        `,
        [album.title, album.artist, album.id]
        ).then(({ rows }) => rows[0]);       
    },
    delete(id) {
        return client.query(`
            DELETE FROM Albums
            WHERE id = $1;
        `,
        [id]
        ).then(() => null);       
    }
};