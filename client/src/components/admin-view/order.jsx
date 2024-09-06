import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsVIew from "./order-details";

function AdminOrders() {
  const [opendetaildialog, setopendetaildialog] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Total</TableHead>
              <TableHead>
                <span className="sr-only">details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>45678</TableCell>
              <TableCell>45678</TableCell>
              <TableCell>45678</TableCell>
              <TableCell>45678</TableCell>
              <TableCell>
                <Dialog
                  open={opendetaildialog}
                  onOpenChange={setopendetaildialog}
                >
                  <Button onClick={() => setopendetaildialog(true)}>
                    View Details
                  </Button>
                  <AdminOrderDetailsVIew />
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrders;
