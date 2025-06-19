import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private balanceSubject = new BehaviorSubject<number>(0);
  balance$ = this.balanceSubject.asObservable();

  constructor(private apollo: Apollo, private httpLink: HttpLink) {
    // Inicialização do Apollo Client
    this.initApollo();
  }

  private initApollo(): void {
    // Obter o token JWT do localStorage (inserido pelo Shell)
    const token = localStorage.getItem('auth_token');

    this.apollo.create({
      link: this.httpLink.create({
        uri: 'http://localhost:4000/graphql',
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
