import { ProductOrderService } from './../../../service/product-order.service';
import { ProductAPIService } from './../../../service/product-api.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { Product } from 'src/app/demo/api/product';
import {
  AppConfig,
  LayoutService,
} from 'src/app/layout/service/app.layout.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { Table } from 'primeng/table';
import { MenuItem } from 'primeng/api';
import { UserService } from 'src/app/demo/service/user.service';

@Component({
  templateUrl: './ecommerce.dashboard.component.html',
})
export class EcommerceDashboardComponent implements OnInit, OnDestroy {
  products: Product[] = [];

  productsThisWeek: Product[] = [];

  productsLastWeek: Product[] = [];

  productsBestSellers: Product[] = [];

  subscription!: Subscription;

  items: MenuItem[] = [];

  ordersChart: any;

  ordersChartOptions: any;

  revenueChart: any;

  revenueChartOptions: any;

  cols: any[] = [];

  config: AppConfig = this.layoutService.config();

  orderWeek: any[] = [];

  metrics: any[] = [];

  teamMembers: any[] = [];

  selectedOrderWeek!: any;

  constructor(
    private layoutService: LayoutService,
    private productAPIService: ProductAPIService,
    private userService: UserService
  ) {
    this.subscription = this.layoutService.configUpdate$
      .pipe(debounceTime(25))
      .subscribe((config) => {
        this.initCharts();
      });
  }

  ngOnInit(): void {
    this.userService.get().subscribe({
      next: res => {
        this.teamMembers = res;
        console.log(this.teamMembers)
      }
    })
    this.productAPIService.get().subscribe({
      next: (res) => {
        this.products = res;
        this.productsThisWeek = res;
        this.productsLastWeek = [...res].reverse();
        this.productsBestSellers = res.slice(0, 7)
      },
      error: (err) => {
        console.log(err)
      }
    })

    this.cols = [
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' },
    ];

    this.items = [
      {
        label: 'Shipments',
        items: [
          { label: 'Tracker', icon: 'pi pi-compass' },
          { label: 'Map', icon: 'pi pi-map-marker' },
          { label: 'Manage', icon: 'pi pi-pencil' },
        ],
      },
    ];

    this.orderWeek = [
      { name: 'This Week', code: '0' },
      { name: 'Last Week', code: '1' },
    ];

    this.metrics = [
      {
        title: 'Orders',
        icon: 'pi pi-shopping-cart',
        color_light: '#64B5F6',
        color_dark: '#1976D2',
        textContent: [
          { amount: '640', text: 'Pending' },
          { amount: '1420', text: 'Completed' },
        ],
      },
      {
        title: 'Revenue',
        icon: 'pi pi-dollar',
        color_light: '#7986CB',
        color_dark: '#303F9F',
        textContent: [
          { amount: '$2,100', text: 'Expenses' },
          { amount: '$9,640', text: 'Income' },
        ],
      },
      {
        title: 'Customers',
        icon: 'pi pi-users',
        color_light: '#4DB6AC',
        color_dark: '#00796B',
        textContent: [
          { amount: 8272, text: 'Active' },
          { amount: 25402, text: 'Registered' },
        ],
      },
      {
        title: 'Comments',
        icon: 'pi pi-users',
        color_light: '#4DD0E1',
        color_dark: '#0097A7',
        textContent: [
          { amount: 12, text: 'New' },
          { amount: 85, text: 'Responded' },
        ],
      },
    ];
    this.initCharts();
  }

  initCharts() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder =
      documentStyle.getPropertyValue('--surface-border');
    this.ordersChart = {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
      ],
      datasets: [
        {
          label: 'New',
          data: [2, 7, 20, 9, 16, 9, 5],
          backgroundColor: ['rgba(100, 181, 246, 0.2)'],
          borderColor: ['#64B5F6'],
          borderWidth: 3,
          fill: true,
          tension: 0.4,
        },
      ],
    };

    this.ordersChartOptions = {
      plugins: {
        legend: {
          display: true,
          labels: {
            color: textColor,
          },
        },
      },
      hover: {
        mode: 'index',
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: [surfaceBorder],
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
            min: 0,
            max: 20,
          },
          grid: {
            color: [surfaceBorder],
            drawBorder: false,
          },
        },
      },
    };

    this.revenueChart = {
      labels: ['Direct', 'Promoted', 'Affiliate'],
      datasets: [
        {
          data: [40, 35, 25],
          backgroundColor: ['#64B5F6', '#7986CB', '#4DB6AC'],
          borderColor: [surfaceBorder],
        },
      ],
    };

    this.revenueChartOptions = {
      plugins: {
        legend: {
          display: true,
          labels: {
            color: textColor,
          },
        },
      },
    };
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
    );
  }

  changeDataset(event: any) {
    const dataSet = [
      [2, 7, 20, 9, 16, 9, 5],
      [2, 4, 9, 20, 16, 12, 20],
      [2, 17, 7, 15, 4, 20, 8],
      [2, 2, 20, 4, 17, 16, 20],
    ];

    this.ordersChart.datasets[0].data =
      dataSet[parseInt(event.currentTarget.getAttribute('data-index'))];
    this.ordersChart.datasets[0].label =
      event.currentTarget.getAttribute('data-label');
    this.ordersChart.datasets[0].borderColor =
      event.currentTarget.getAttribute('data-stroke');
    this.ordersChart.datasets[0].backgroundColor =
      event.currentTarget.getAttribute('data-fill');
  }

  recentSales(event: any) {
    if (event.value.code === '0') {
      this.products = this.productsThisWeek;
    } else {
      this.products = this.productsLastWeek;
    }
  }

  updateChartOptions() {
    if (this.config.colorScheme === 'dark') this.applyDarkTheme();
    else this.applyLightTheme();
  }

  applyDarkTheme() {
    this.ordersChartOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#ebedef',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#ebedef',
          },
          grid: {
            color: 'rgba(160, 167, 181, .3)',
          },
        },
        y: {
          ticks: {
            color: '#ebedef',
          },
          grid: {
            color: 'rgba(160, 167, 181, .3)',
          },
        },
      },
    };
  }

  applyLightTheme() {
    this.ordersChartOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
      },
    };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
