import { Get } from './BaseService'

const SearchService = {
  getSearch: (query?: any) => {
    return Get<any>(`/search/multi`, query)
  },
}

export default SearchService
