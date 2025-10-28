import HomeController from './HomeController'
import SearchController from './SearchController'
import DomainController from './DomainController'

const Controllers = {
    HomeController: Object.assign(HomeController, HomeController),
    SearchController: Object.assign(SearchController, SearchController),
    DomainController: Object.assign(DomainController, DomainController),
}

export default Controllers