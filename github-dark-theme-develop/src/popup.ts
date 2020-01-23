import * as angular from 'angular';
import { config } from './config';
import { fetchDomainString, storage } from './libs';

module app {
    'use strict';

    interface IPopupScope extends angular.IScope {}

    class PopupController {
        static $inject = ['$scope'];
        private scope: IPopupScope;
        public domainList: string[];
        public yourDomain: string;
        public useSystemPrefers: boolean;

        constructor($scope: IPopupScope) {
            this.scope = $scope;
            this.init();
        }

        private init = () => {
            storage.sync
                .get(config.storage.nameOfDomainList)
                .then(data => {
                    this.domainList = data.domainList as string[];
                    this.scope.$apply();
                })
                .catch(error => {
                    console.log(error);
                    this.domainList = ['ERROR'];
                    this.scope.$apply();
                });
        };

        public add = () => {
            chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                let currentTabUrl = tabs[0].url;
                let url = this.yourDomain ? this.yourDomain : currentTabUrl;
                let domain = fetchDomainString(url);

                this.yourDomain = '';

                if (domain === '') return;
                if (this.domainList.includes(domain)) return;

                this.domainList.push(domain);
                this.scope.$apply();
                storage.sync.set({ domainList: this.domainList });
            });
        };

        public remove = (domain: string) => {
            this.domainList = [...this.domainList.filter(d => d !== domain)];
            storage.sync.set({ domainList: this.domainList });
        };

        public reset = () => {
            this.domainList = config.defaultDomainList;
            storage.sync.clear().then(() => {
                storage.sync.set({ domainList: config.defaultDomainList });
            });
        };

        public navigate = (domain: string) => {
            chrome.tabs.create({ active: true, url: `http://${domain}` }, tab => {
                console.log(tab);
            });
        };

        public setSystemPrefers = async (value: boolean) => {
            //TODO: save config into storage
            this.useSystemPrefers = value;
        };
    }

    angular.module('app', []).controller('popupController', PopupController);
}
