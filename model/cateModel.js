var cate = {
    insert:'insert into cate(name, pid) values(?,?)',
    update:'update cate set name=? where id=?',
    delete: 'update cate set isdel=1 where id=?',
    select: 'select * from cate where isdel=0'

};

module.exports = cate;