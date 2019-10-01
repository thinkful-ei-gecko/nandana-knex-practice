require('dotenv').config();
const knex=require('knex');
const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

function searchByName(searchTerm) {
  knexInstance
    .select('id', 'name', 'price', 'category')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log(result);
    });
}

searchByName('fish');

function paginateProducts(page) {
  const productsPerPage = 6;
  const offset = productsPerPage * (page - 1);
  knexInstance
    .select('id', 'name', 'price', 'category')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result);
    });
}

paginateProducts(2);

function itemsAddedAfterDate(dayAgo){
  knexInstance
    .select('id', 'name', 'price', 'date_added', 'checked', 'category')
    .from('shopping_list')
    .where('date_added','>',
      knexInstance.raw('now() - \'?? days\':: INTERVAL', dayAgo)
    )
    .then(result => {
      console.log(result);
    });
}

itemsAddedAfterDate(3);

function totalCostForEachCategory(){
  knexInstance
    .select( 'category')
    .from('shopping_list')
    .groupBy('category')
    .sum('price')
    .then(result => {
      console.log(result);
    });
}

totalCostForEachCategory();