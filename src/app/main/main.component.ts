import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, signal} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {HlmLabelDirective} from "@spartan-ng/ui-label-helm";
import {HlmInputDirective} from "@spartan-ng/ui-input-helm";
import {HlmButtonDirective} from "@spartan-ng/ui-button-helm";
import {DEFAULT_INTERVAL, STORAGE_KEY_INTERVAL, STORAGE_KEY_IS_DISABLED} from "../../constant";
import {HlmSeparatorDirective} from "@spartan-ng/ui-separator-helm";
import {HlmIconComponent} from "@spartan-ng/ui-icon-helm";
import {HlmSwitchDirective, HlmSwitchThumbDirective} from "@spartan-ng/ui-switch-helm";
import {BrnSwitchComponent, BrnSwitchThumbComponent} from "@spartan-ng/ui-switch-brain";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,
    HlmSeparatorDirective,
    HlmSeparatorDirective,
    HlmIconComponent,
    HlmSwitchDirective,
    HlmSwitchThumbDirective,
    BrnSwitchComponent,
    BrnSwitchThumbComponent,
    HlmSwitchDirective,
  ],
  templateUrl: './main.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  isDisabled = signal<boolean>(false);
  cd: ChangeDetectorRef = inject(ChangeDetectorRef);
  form = new FormControl<number | null>(DEFAULT_INTERVAL)

  ngOnInit(): void {
    chrome.storage.sync.get(
      [STORAGE_KEY_INTERVAL, STORAGE_KEY_IS_DISABLED],
      (result) => {
        this.isDisabled.set(result[STORAGE_KEY_IS_DISABLED]);
        this.form.setValue(result[STORAGE_KEY_INTERVAL] || DEFAULT_INTERVAL);
        this.cd.detectChanges();
      }
    );
  }

  save(): void {
    const value = Math.max(500, this.form.value || DEFAULT_INTERVAL);
    chrome.storage.sync.set(
      {
        [STORAGE_KEY_INTERVAL]: value,
      },
      () => {
        console.log("Settings saved");
        this.form.setValue(value);
        this.cd.detectChanges();
      }
    );
  }

  async reload() {
    const tabs = chrome.tabs.query({url: "https://chat.openai.com/*"});

    tabs.then((tabs) => {
      tabs.forEach((tab) => {
        if (tab.id) {
          chrome.tabs.reload(tab.id);
        }
      });
    });
  }

  changeActive($event: boolean): void {
    chrome.storage.sync.set(
      {
        [STORAGE_KEY_IS_DISABLED]: !$event,
      },
      () => {
        console.log("Settings saved");
        this.isDisabled.set(!$event);
        if (this.isDisabled()) {
          this.form.disable();
        } else {
          this.form.enable();
        }
        this.cd.detectChanges();
      }
    );
  }
}
