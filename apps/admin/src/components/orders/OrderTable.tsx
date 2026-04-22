"use client";
import React from "react";
import { ArrowUpDown } from "lucide-react";
import { OrderRow } from "./OrderRow";

export const OrderTable = ({ orders }: { orders: any[] }) => (
  <table className="data-table">
    <thead>
      <tr>
        <th>
          Order ID <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} />
        </th>
        <th>
          Customer <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} />
        </th>
        <th>
          Date <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} />
        </th>
        <th>
          Total <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} />
        </th>
        <th>
          Status <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} />
        </th>
        <th>
          Action <ArrowUpDown size={12} style={{ marginLeft: 4, opacity: 0.5 }} />
        </th>
      </tr>
    </thead>
    <tbody>
      {orders?.map((order) => (
        <OrderRow key={order.id} order={order} />
      ))}
      {(!orders || orders.length === 0) && (
        <tr>
          <td colSpan={6} style={{ textAlign: "center", padding: "24px" }}>
            No orders found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
);
