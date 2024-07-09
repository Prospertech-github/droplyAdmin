import { useQuery } from "@tanstack/react-query";

export default function useDashboard() {
  return useQuery<{
    order: {
      total_orders_all_time: number;
      total_orders_this_month: number;
      total_orders_last_month: number;
    };
    revenue: {
      total_revenue_all_time: number;
      total_revenue_this_month: number;
      total_revenue_last_month: number;
    };
    riders: {
      total_riders: number;
      total_riders_this_month: number;
      total_riders_last_month: number;
    };
    profits: {
      total_profit_all_time: number;
      total_profit_this_month: number;
      total_profit_last_month: number;
    };
    customers: {
      total_customers: number;
      total_customers_this_month: number;
      total_customers_last_month: number;
    };
    merchants: {
      total_merchants: number;
      total_merchants_this_month: number;
      total_merchants_last_month: number;
    };
    top_merchants: {
      all_time: TopRider[];
      this_month: TopRider[];
      this_year: TopRider[];
    };
  }>(["analytics/admin-dashboard/"]);
}

export function useDashboardPlatform() {
  return useQuery<{
    all_time: P;
    this_month: P;
    this_year: P;
  }>(["analytics/platform-analysis/"]);
}

export function useDashboardChart() {
  return useQuery<K>(["analytics/order-chart/"]);
}

export function useDashboardRevenueChart() {
  return useQuery<K>(["analytics/revenue-chart/"]);
}

type K = {
  "7_days": {
    day: string;
    date: string;
    confirmed: number;
    "in-transit": number;
    picked: number;
    completed: number;
  }[];
  monthly: F;
  yearly: F;
};

type P = {
  whatsapp: number;
  mobile: number;
};

type F = Record<
  string,
  {
    confirmed: number;
    "in-transit": number;
    picked: number;
    completed: number;
  }
>;

type TopRider = {
  rider__company__user__id: string;
  rider__company__user__first_name: string;
  rider__company__user__last_name: string;
  rider__company__user__email: string;
  rider__company__user__phone: string;
  rider__company__name: string;
  order_count: number;
};
