class EmployeeFilterFields extends View{
    constructor(elemento, scope, baseUrl){
    super(elemento, scope, baseUrl);
    }
    template(model,baseUrl){
    return(`
    <div class="mt_filter_options">
      <div class="mt_row">
        <div class="mt_filter select">
          <select id="stateFilter" onchange="changeState(this.value)" class="form-control">
            <option selected disabled>Estado</option>
            ${
            model.states.map((e) => {
            return(`
            <option value="${e.sigla}" ${model.selectedState == e.sigla ? "selected" : ""}>${e.nome}</option>
            `)
            }).join('')
            }
          </select>
        </div>
        <div class="mt_filter select">
          <select id="cityFilter" onchange="changeCity(this.value)" class="form-control">
            <option selected disabled>Cidade</option>
            ${
            model.cities.map((c) => {
            return(`
            <option value="${c.nome}">${c.nome}</option>
            `)
            }).join('')
            }
          </select>
        </div>
      </div>
      <div class="mt_row" width="100%">
        <div class="mt_filter input" style="flex:1">
          <input type="text" id="nameFilter" class="form-control" placeholder="Procurar pelo nome" value="${model.currentName}" onKeyUp="filterByName(value)" class="form-control">
        </div>
        </div>
        <div class="mt_row justify-content-end">
          <div class="mt_filter">
            <button id="filterButton" onclick="filterEvents()" class="btn btn-primary">
            Buscar
            </button>
          </div>
          <div class="mt_filter">
            <button id="removeFilterButton" onclick="removeFilters()" class="btn btn-remove">
            Remover Filtros
            </button>
          </div>
        </div>
      </div>
    </div>
    `);
    }
    }
