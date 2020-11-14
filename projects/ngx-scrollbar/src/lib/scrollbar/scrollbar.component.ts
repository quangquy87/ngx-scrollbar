import { Component, Inject, NgZone, ChangeDetectionStrategy, ElementRef, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { TrackXDirective, TrackYDirective } from './track/track.directive';
import { ThumbXDirective, ThumbYDirective } from './thumb/thumb.directive';
import { NgScrollbar } from '../ng-scrollbar';
import { Scrollbar } from './scrollbar';

@Component({
  selector: 'scrollbar-y',
  host: { '[class.scrollbar-control]': 'true' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./vertical.scss'],
  template: `
    <div scrollbarTrackY class="ng-scrollbar-track {{cmp.trackClass}}">
      <div scrollbarThumbY class="ng-scrollbar-thumb {{cmp.thumbClass}}"></div>
    </div>
  `
})
export class ScrollbarY extends Scrollbar {

  @ViewChild(TrackYDirective, { static: true }) readonly track: TrackYDirective | undefined;
  @ViewChild(ThumbYDirective, { static: true }) readonly thumb: ThumbYDirective | undefined;

  protected get viewportScrollSize(): number {
    return this.cmp.viewport!.scrollHeight;
  }

  get thickness(): number {
    return this.el.nativeElement.clientWidth;
  }

  constructor(private el: ElementRef,
              public cmp: NgScrollbar,
              protected platform: Platform,
              @Inject(DOCUMENT) protected document: any,
              protected zone: NgZone) {
    super(cmp, platform, document, zone);
  }

  protected setHovered(value: boolean): void {
    this.cmp.setHovered({ verticalHovered: value });
  }

  onUpdated(): void {
    if (!this.cmp.autoWidthDisabled) {
      // Auto-width: Set root component minWidth to content width
      this.cmp.nativeElement.style.minWidth = this.cmp.appearance === 'standard'
        ? `${ this.cmp.viewport!.contentWidth + this.thickness }px`
        : `${ this.cmp.viewport!.contentWidth }px`;
    }
  }
}

@Component({
  selector: 'scrollbar-x',
  host: { '[class.scrollbar-control]': 'true' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./horizontal.scss'],
  template: `
    <div scrollbarTrackX class="ng-scrollbar-track {{cmp.trackClass}}">
      <div scrollbarThumbX class="ng-scrollbar-thumb {{cmp.thumbClass}}"></div>
    </div>
  `
})
export class ScrollbarX extends Scrollbar {

  @ViewChild(TrackXDirective, { static: true }) readonly track: TrackXDirective | undefined;
  @ViewChild(ThumbXDirective, { static: true }) readonly thumb: ThumbXDirective | undefined;

  protected get viewportScrollSize(): number {
    return this.cmp.viewport!.scrollWidth;
  }

  get thickness(): number {
    return this.el.nativeElement.clientHeight;
  }

  constructor(private el: ElementRef,
              public cmp: NgScrollbar,
              protected platform: Platform,
              @Inject(DOCUMENT) protected document: any, protected zone: NgZone) {
    super(cmp, platform, document, zone);
  }

  protected setHovered(value: boolean): void {
    this.cmp.setHovered({ horizontalHovered: value });
  }

  onUpdated(): void {
    if (!this.cmp.autoHeightDisabled) {
      // Auto-height: Set root component height to content height
      this.cmp.nativeElement.style.height = this.cmp.appearance === 'standard'
        ? `${ this.cmp.viewport!.contentHeight + this.thickness }px`
        : `${ this.cmp.viewport!.contentHeight }px`;
    }
  }
}
