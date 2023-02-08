import moment from "moment";
import { filterRecord } from "../../utils";
import { IData } from "../../interfaces/interfaces";

const now = new Date();

const data: IData[] = [
  {
    id: 1,
    orderNumber: 172608,
    type: "CAO",
    item: 2040,
    category: "12-Beverages",
    description: "Why I Still Lisp, and You Should Too",
    status: "paid",
    createdAt: moment(now).format("DD-MM-YYYY"),
  },
  {
    id: 2,
    orderNumber: 155085,
    type: "EDF",
    item: 2041,
    category: "12-Fruit",
    description: "Scrum Has Hit the Glass Ceiling",
    status: "unpaid",
    createdAt: moment(now).format("DD-MM-YYYY"),
  },
  {
    id: 3,
    orderNumber: 173568,
    type: "CAO",
    item: 2042,
    category: "12-Beverages",
    description: "How Model View Controller (MVC) Architectures Work",
    status: "paid",
    createdAt: moment(now).format("DD-MM-YYYY"),
  },
  {
    id: 4,
    orderNumber: 199405,
    type: "EDF",
    item: 2044,
    category: "12-Fruit",
    description: "Generating Passive Income Is Hard, Here Is a Better Option",
    status: "paid",
    createdAt: moment(now).format("DD-MM-YYYY"),
  },
];

class OrderApi {
  getOrders() {
    return Promise.resolve(data);
  }
  searchOrders(payload: any) {
    const { orderNumber, itemNumber, category, type } = payload;
    var result: any = [];
    let filter;

    if (type) {
      type.forEach(function (item: any) {
        filter = filterRecord(data, "type", item);
        if (filter.length > 0) {
          result.push(filter);
        }
      });
    }
    if (orderNumber) {
      orderNumber.split(/\s*,\s*/).forEach(function (item: any) {
        filter = filterRecord(data, "orderNumber", Number(item));
        if (filter.length > 0) {
          result.push(filter);
        }
      });
    }

    if (itemNumber) {
      filter = filterRecord(data, "item", Number(itemNumber));
      if (filter.length > 0) {
        result.push(filter);
      }
    }

    if (category) {
      filter = filterRecord(data, "category", category);
      if (filter.length > 0) {
        result.push(filter);
      }
    }

    if (type) {
      filter = filterRecord(data, "type", type);
      if (filter.length > 0) {
        result.push(filter);
      }
    }

    return Promise.resolve(result.flat());
  }
}

export const orderApi = new OrderApi();
