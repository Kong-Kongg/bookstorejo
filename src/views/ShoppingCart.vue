<template>
  <div class="shoppingCart">
    <table>
      <tr>
        <th></th>
        <th>商品名称</th>
        <th>单价</th>
        <th>数量</th>
        <th>金额</th>
        <th>操作</th>
      </tr>

      <tr v-for="book in books" :key="book.id">
        <td><img :src="book.imgUrl" /></td>
        <td>
          <router-link
            :to="{ name: 'book', params: { id: book.id } }"
            target="_blank"
          >
            {{ book.title }}
          </router-link>
        </td>
        <td>{{ book.price | currency }}</td>
        <td>
          <button @click="handleSubtract(book, $event)">-</button>
          {{ book.quantity }}
          <button @click="handleAdd(book.id)">+</button>
        </td>
        <td>{{ cartItemPrice(book.id) | currency }}</td>
        <td>
          <button @click="deleteCartItem(book.id)">删除</button>
        </td>
      </tr>
    </table>

    <p>
      <span><button class="checkout" @click="checkout">结算</button></span>
      <span>总价：{{ cartTotalPrice | currency }}</span>
    </p>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex';
export default {
  name: 'ShoppingCart',

  computed: {
    ...mapState('cart', {
      books: 'items',
    }),
    ...mapGetters('cart', ['cartItemPrice', 'cartTotalPrice']),
  },

  methods: {
    itemPrice(price, count) {
      return price * count;
    },
    ...mapMutations('cart', [
      'deleteCartItem',
      'incrementItemQuantity',
      'setCartItems',
    ]),
    handleAdd(id) {
      this.incrementItemQuantity({ id: id, quantity: 1 });
    },

    handleSubtract(book, e) {
      let quantity = book.quantity - 1;

      if (quantity <= 0) {
        e.target.disabled = true;
        this.$msgBox.show({
          title: '您确定要删除商品吗？',
          cancel: '取消',
          handleOk: () => this.deleteCartItem(book.id),
          handleCancel: () => {
            e.target.disabled = false;
          },
        });
      } else this.incrementItemQuantity({ id: book.id, quantity: -1 });
    },
    checkout() {
      this.$router.push('/check');
    },
  },
};
</script>
<style scoped>
.shoppingCart {
  text-align: center;
  margin-left: 45px;
  width: 96%;
  margin-top: 70px;
}
.shoppingCart table {
  border: solid 1px black;
  width: 100%;
  background-color: #eee;
}

.shoppingCart th {
  height: 50px;
}
.shoppingCart th,
.shoppingCart td {
  border-bottom: solid 1px #ddd;
  text-align: center;
}
.shoppingCart span {
  float: right;
  padding-right: 15px;
}

.shoppingCart img {
  width: 60px;
  height: 60px;
}
.shoppingCart .checkout {
  /*position: absolute;
    right: 0px;
    top: 0;*/
  float: right;
  width: 60px;
  height: 30px;
  margin: 0;
  border: none;
  color: white;
  background-color: red;
  cursor: pointer;
}
</style>
