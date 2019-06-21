import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

interface Profile {
  name: string;
}

@Component({
  selector: 'app-life-cycles-child-with-detect-changes',
  templateUrl: './life-cycles-child-with-detect-changes.component.html',
  styleUrls: ['./life-cycles-child-with-detect-changes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LifeCyclesChildWithDetectChangesComponent implements OnInit {
  @Input() profile: Profile;
  name: string;
  check = false;

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.name = this.profile.name;
  }

  ngDoCheck() {
    // check for object mutation
    if (this.name !== this.profile.name) {
      console.log('check============', this.check);
      this.check ? this.cd.markForCheck() : null;
    }
  }

  detect() {
    this.check = !this.check;
  }

}
