import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DatosMysqlDataSource} from '../datasources';
import {Categoria, CategoriaRelations, Producto} from '../models';
import {ProductoRepository} from './producto.repository';

export class CategoriaRepository extends DefaultCrudRepository<
  Categoria,
  typeof Categoria.prototype.id,
  CategoriaRelations
> {

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Categoria.prototype.id>;

  constructor(
    @inject('datasources.datos_mysql') dataSource: DatosMysqlDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Categoria, dataSource);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
  }
}
