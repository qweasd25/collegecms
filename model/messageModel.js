var message = {
    insert:'insert into message(phone, content,timestamp) values(?,?,?)',
    select:'select * from message',
    judge:'update message set is_show=? where id=?',
    del:'delete from message where id=?',
    show:'select * from message where is_show=1'
};
module.exports = message;