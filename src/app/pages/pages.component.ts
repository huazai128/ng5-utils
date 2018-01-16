import { Component } from '@angular/core';
import { SettingService,MenuService,Menu } from '@theme';

@Component({
  selector:'app-theme',
  templateUrl:'./pages.html',
})

export class PagesComponent{
  munes:Menu[] = [
    {
      text: 'test',
      group: true,
      children: [
        {
          text: 'Dashboard',
          link: '/dashboard',
          icon: 'anticon anticon-appstore-o'
        },
        {
          text: 'Level1',
          link: '/level',
          icon: 'anticon anticon-appstore-o',
          children: [
            {
              text: 'Level2',
              link: '#',
              children: [
                { text: 'Level3', link: '#' },
                { text: 'Level3', link: '#' }
              ]
            },
            { text: 'Level2', link: '#' }
          ]
        },
        { text: 'table', link: '/abc/table' },
        { text: 'Reuse Tab', link: '/abc/reuse-tab' },
        { text: 'Ellipsis', link: '/abc/ellipsis' },
        { text: 'JWT', link: '/acl/jwt' },
        { text: 'ueditor', link: '/editor/ueditor' },
        { text: 'tinymce', link: '/editor/tinymce' },
        {
          text: 'ABC',
          icon: 'anticon anticon-appstore',
          children: [
            { text: 'Reuse Tab', link: '/abc/reuse-tab' },
            { text: 'Ellipsis', link: '/abc/ellipsis' }
          ]
        },
        {
          text: 'ACL',
          icon: 'anticon anticon-save',
          children: [
            { text: 'JWT', link: '/acl/jwt' }
          ]
        }
      ]
    }
  ];

  constructor(
    private menuService:MenuService,
    public settings: SettingService
  ){}

  ngOnInit():void{
    this.menuService.add(this.munes);
  };
}
