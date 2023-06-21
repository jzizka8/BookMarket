import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Order } from '../types/prismaTypes';
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    padding: 50,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontWeight: 'bold',
    borderBottom: '1pt solid black',
    paddingBottom: 5,
    marginBottom: 10,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 5,
  },
  itemPrice: {
    marginLeft: 'auto',
  },
  total: {
    marginTop: 10,
    textAlign: 'right',
    fontSize: 20,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    marginRight: 10,
    color: 'red',
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 10,
    textAlign: 'right',
  },
});
interface IInvoiceProps {
  order: Order;
}

export const Invoice = (props: IInvoiceProps) => {
  const shipping = props.order.shippingInfo;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>Invoice</Text>
        </View>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.companyName}>Re-Tale</Text>
            <Text style={styles.address}>123 Main Street</Text>
            <Text style={styles.address}>New York, NY, 10025</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>Customer Information</Text>
          <Text>{`${shipping.name} ${shipping.surname}`} </Text>
          <Text>{`${shipping.phoneNumber}`}</Text>
          <Text>{`${shipping.street}`}</Text>
          <Text>{`${shipping.zipcode}, ${shipping.city}`}</Text>
          <Text>{`${shipping.country}`}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>Invoice Details</Text>
          <Text>Order id: {props.order.id.split('-')[0]}</Text>
          <Text>Created on: {props.order.createdAt.toDateString()}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>Items</Text>
          {props.order.books.map((book) => (
            <View style={styles.item} key={book.id}>
              <Text>{book.title}</Text>
              <Text style={styles.itemPrice}>
                {book.price.toFixed(2)}&nbsp;&euro;
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.total}>
          <Text>Total: {props.order.amount.toFixed(2)}&nbsp;&euro;</Text>
        </View>
      </Page>
    </Document>
  );
};
