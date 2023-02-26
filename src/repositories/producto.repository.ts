import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DatosMysqlDataSource} from '../datasources';
import {Producto, ProductoRelations, Categoria} from '../models';
import {CategoriaRepository} from './categoria.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly categoria: BelongsToAccessor<Categoria, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.datos_mysql') dataSource: DatosMysqlDataSource, @repository.getter('CategoriaRepository') protected categoriaRepositoryGetter: Getter<CategoriaRepository>,
  ) {
    super(Producto, dataSource);
    this.categoria = this.createBelongsToAccessorFor('categoria', categoriaRepositoryGetter,);
    this.registerInclusionResolver('categoria', this.categoria.inclusionResolver);
  }
}
