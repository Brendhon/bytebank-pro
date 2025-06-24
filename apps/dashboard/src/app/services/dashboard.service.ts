import { HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { InMemoryCache } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apollo = inject(Apollo);
  private httpLink = inject(HttpLink);

  private balanceSubject = new BehaviorSubject<number>(0);
  balance$ = this.balanceSubject.asObservable();

  constructor() {
    // Inicialização do Apollo Client
    this.initApollo();
  }

  private initApollo(): void {
    // Obter o token JWT do localStorage (inserido pelo Shell)
    const token = localStorage.getItem('auth_token');

    this.apollo.create({
      link: this.httpLink.create({
        uri: environment.apiUrl,
        headers: new HttpHeaders().set('Authorization', token ? `Bearer ${token}` : '')
      }),
      cache: new InMemoryCache()
    });
  }

  // Este método será implementado posteriormente para buscar os dados reais
  loadDashboardData(): void {
    // Implementação futura usando Apollo Client GraphQL
    console.log('Carregando dados do dashboard via GraphQL');

    // Por enquanto, usando dados fictícios
    this.balanceSubject.next(15750);
  }
}
