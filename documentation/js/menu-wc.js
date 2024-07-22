'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-blog-api documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-b4843713e58a0527103e9707ba15fa5a4267f3313b591f5aaeb9576c350dce0bc0796406a30974b49773008b28b9e27303c4e8951bdd6afd6175cb21e1570e77"' : 'data-bs-target="#xs-controllers-links-module-AppModule-b4843713e58a0527103e9707ba15fa5a4267f3313b591f5aaeb9576c350dce0bc0796406a30974b49773008b28b9e27303c4e8951bdd6afd6175cb21e1570e77"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-b4843713e58a0527103e9707ba15fa5a4267f3313b591f5aaeb9576c350dce0bc0796406a30974b49773008b28b9e27303c4e8951bdd6afd6175cb21e1570e77"' :
                                            'id="xs-controllers-links-module-AppModule-b4843713e58a0527103e9707ba15fa5a4267f3313b591f5aaeb9576c350dce0bc0796406a30974b49773008b28b9e27303c4e8951bdd6afd6175cb21e1570e77"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-b4843713e58a0527103e9707ba15fa5a4267f3313b591f5aaeb9576c350dce0bc0796406a30974b49773008b28b9e27303c4e8951bdd6afd6175cb21e1570e77"' : 'data-bs-target="#xs-injectables-links-module-AppModule-b4843713e58a0527103e9707ba15fa5a4267f3313b591f5aaeb9576c350dce0bc0796406a30974b49773008b28b9e27303c4e8951bdd6afd6175cb21e1570e77"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-b4843713e58a0527103e9707ba15fa5a4267f3313b591f5aaeb9576c350dce0bc0796406a30974b49773008b28b9e27303c4e8951bdd6afd6175cb21e1570e77"' :
                                        'id="xs-injectables-links-module-AppModule-b4843713e58a0527103e9707ba15fa5a4267f3313b591f5aaeb9576c350dce0bc0796406a30974b49773008b28b9e27303c4e8951bdd6afd6175cb21e1570e77"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-e57a4c20013781da734d43f3eb5e6a686e734085e471765b5ffc5b910249dde2aa1a265ff451293f57592e20acff067a2620f8105952cfbc0a3577472f66c79a"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-e57a4c20013781da734d43f3eb5e6a686e734085e471765b5ffc5b910249dde2aa1a265ff451293f57592e20acff067a2620f8105952cfbc0a3577472f66c79a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-e57a4c20013781da734d43f3eb5e6a686e734085e471765b5ffc5b910249dde2aa1a265ff451293f57592e20acff067a2620f8105952cfbc0a3577472f66c79a"' :
                                            'id="xs-controllers-links-module-AuthModule-e57a4c20013781da734d43f3eb5e6a686e734085e471765b5ffc5b910249dde2aa1a265ff451293f57592e20acff067a2620f8105952cfbc0a3577472f66c79a"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-e57a4c20013781da734d43f3eb5e6a686e734085e471765b5ffc5b910249dde2aa1a265ff451293f57592e20acff067a2620f8105952cfbc0a3577472f66c79a"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-e57a4c20013781da734d43f3eb5e6a686e734085e471765b5ffc5b910249dde2aa1a265ff451293f57592e20acff067a2620f8105952cfbc0a3577472f66c79a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-e57a4c20013781da734d43f3eb5e6a686e734085e471765b5ffc5b910249dde2aa1a265ff451293f57592e20acff067a2620f8105952cfbc0a3577472f66c79a"' :
                                        'id="xs-injectables-links-module-AuthModule-e57a4c20013781da734d43f3eb5e6a686e734085e471765b5ffc5b910249dde2aa1a265ff451293f57592e20acff067a2620f8105952cfbc0a3577472f66c79a"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-b28bee2b866bce1c0cbae50a4f1dd114735a343ea6a9b23930eebce531fcff5ac208e302d6e058e00b71cbfc5cadf22d8ccc51a6cb2074dc17189bd8eab99ccd"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-b28bee2b866bce1c0cbae50a4f1dd114735a343ea6a9b23930eebce531fcff5ac208e302d6e058e00b71cbfc5cadf22d8ccc51a6cb2074dc17189bd8eab99ccd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-b28bee2b866bce1c0cbae50a4f1dd114735a343ea6a9b23930eebce531fcff5ac208e302d6e058e00b71cbfc5cadf22d8ccc51a6cb2074dc17189bd8eab99ccd"' :
                                            'id="xs-controllers-links-module-PostsModule-b28bee2b866bce1c0cbae50a4f1dd114735a343ea6a9b23930eebce531fcff5ac208e302d6e058e00b71cbfc5cadf22d8ccc51a6cb2074dc17189bd8eab99ccd"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-b28bee2b866bce1c0cbae50a4f1dd114735a343ea6a9b23930eebce531fcff5ac208e302d6e058e00b71cbfc5cadf22d8ccc51a6cb2074dc17189bd8eab99ccd"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-b28bee2b866bce1c0cbae50a4f1dd114735a343ea6a9b23930eebce531fcff5ac208e302d6e058e00b71cbfc5cadf22d8ccc51a6cb2074dc17189bd8eab99ccd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-b28bee2b866bce1c0cbae50a4f1dd114735a343ea6a9b23930eebce531fcff5ac208e302d6e058e00b71cbfc5cadf22d8ccc51a6cb2074dc17189bd8eab99ccd"' :
                                        'id="xs-injectables-links-module-PostsModule-b28bee2b866bce1c0cbae50a4f1dd114735a343ea6a9b23930eebce531fcff5ac208e302d6e058e00b71cbfc5cadf22d8ccc51a6cb2074dc17189bd8eab99ccd"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-e29fb8c8b683b269dc9059266b433bf9836899515ebdb98cafc8b96b3e3a2949c2f7247e7f2ec8ee52a9fbcdb7d8419b1179da1444989df572962cf8a0406f85"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-e29fb8c8b683b269dc9059266b433bf9836899515ebdb98cafc8b96b3e3a2949c2f7247e7f2ec8ee52a9fbcdb7d8419b1179da1444989df572962cf8a0406f85"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-e29fb8c8b683b269dc9059266b433bf9836899515ebdb98cafc8b96b3e3a2949c2f7247e7f2ec8ee52a9fbcdb7d8419b1179da1444989df572962cf8a0406f85"' :
                                            'id="xs-controllers-links-module-UsersModule-e29fb8c8b683b269dc9059266b433bf9836899515ebdb98cafc8b96b3e3a2949c2f7247e7f2ec8ee52a9fbcdb7d8419b1179da1444989df572962cf8a0406f85"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-e29fb8c8b683b269dc9059266b433bf9836899515ebdb98cafc8b96b3e3a2949c2f7247e7f2ec8ee52a9fbcdb7d8419b1179da1444989df572962cf8a0406f85"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-e29fb8c8b683b269dc9059266b433bf9836899515ebdb98cafc8b96b3e3a2949c2f7247e7f2ec8ee52a9fbcdb7d8419b1179da1444989df572962cf8a0406f85"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-e29fb8c8b683b269dc9059266b433bf9836899515ebdb98cafc8b96b3e3a2949c2f7247e7f2ec8ee52a9fbcdb7d8419b1179da1444989df572962cf8a0406f85"' :
                                        'id="xs-injectables-links-module-UsersModule-e29fb8c8b683b269dc9059266b433bf9836899515ebdb98cafc8b96b3e3a2949c2f7247e7f2ec8ee52a9fbcdb7d8419b1179da1444989df572962cf8a0406f85"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateMetaOptionDto.html" data-type="entity-link" >CreateMetaOptionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationQueryDto.html" data-type="entity-link" >PaginationQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Post.html" data-type="entity-link" >Post</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePostDto.html" data-type="entity-link" >UpdatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});