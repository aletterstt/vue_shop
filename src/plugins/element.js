import Vue from 'vue'
import {Button,Form,FormItem,Input,
  Message, Container,Header,Aside,Main,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
  InputNumber,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  MessageBox} from 'element-ui'
  Vue.use(Dialog)
Vue.use(Table)
Vue.use(Pagination)
Vue.use( Tooltip)
Vue.use( Switch)
Vue.use(  TableColumn)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Message)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use( Row)
Vue.use( Col)
Vue.use(  InputNumber)

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;