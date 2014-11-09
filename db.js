// Setup localstoragedb
window.mydb = new localStorageDB("mydb", localStorage);
 if( !mydb.tableExists('payments') ){
  mydb.createTable('payments',['payee','amount','date']);
  mydb.commit();
 }

if( !mydb.tableExists('payees') ){
  mydb.createTable('payees',['name','bank','iban']);
  mydb.commit();
}


