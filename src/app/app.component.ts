import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { AppBaseComponent } from './app.base.component';

@Component({
  selector: 'app-root',
  styleUrls: ['app/app.component.scss'],
  templateUrl: 'app/app.component.html',
})
export class AppComponent extends AppBaseComponent implements OnInit {
  
  constructor(private translate: TranslateService) {
    super();
    // 公共服务注入进来
    // 应用程式语言包
    translate.addLangs(["zh", "en"]);
    translate.setDefaultLang('zh');

    const browserLang = translate.getBrowserLang();
    console.log(`检测到的浏览器语言> ${browserLang}`);
    translate.use(browserLang.match(/zh|en/) ? browserLang : 'zh');
  }

  public isMini: boolean;

  ngOnInit() {

  }

  miniSidebar(isMini) {
    this.isMini = isMini;
    console.log('app..', isMini);
  }
  
  
}