import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Table, Text } from "@medusajs/ui"

type AdminOrder = {
  items: AdminOrderItem[]
}

type AdminOrderItem = {
  thumbnail: string
  title: string
  metadata: {
    customMessage: string
  }
  quantity: number
}

interface AdminOrderProps {
  data: AdminOrder
}


const OrderWidget = ({ data }: AdminOrderProps) => {

  const itemsWithMessages = data.items.filter(
    (item) => item.metadata?.customMessage && item.metadata?.customMessage !== ""
  )

  return (
    <Container className="divide-y p-0">
      <Container className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Custom Messages</Heading>
      </Container>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Variant</Table.HeaderCell>
            <Table.HeaderCell>Custom Message</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {itemsWithMessages.length > 0 ? (
            itemsWithMessages.map(({ thumbnail, title, metadata, quantity }: AdminOrderItem, key) => {
                return (<Table.Row key={key}>
                  <Table.Cell className="flex items-center gap-2.5">
                    <img src={thumbnail} className="w-[30px] h-[30px] object-cover" />
                    <Text>{title}</Text>
                  </Table.Cell>
                  <Table.Cell>{metadata.customMessage}</Table.Cell>
                  <Table.Cell>{`x${quantity}`}</Table.Cell>
                </Table.Row>)
              })
          ) : (
            <Table.Row>
              <Table.Cell colSpan={3}><Text>No items available</Text></Table.Cell>
            </Table.Row>
            )
          }
        </Table.Body>
      </Table>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "order.details.after",
})

export default OrderWidget