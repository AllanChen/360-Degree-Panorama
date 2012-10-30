//
//  ViewController.m
//  ImportPhoenGapProject
//
//  Created by 永坚 陈 on 12-9-14.
//  Copyright (c) 2012年 __MyCompanyName__. All rights reserved.
//

#import "ViewController.h"
#import <Cordova/CDVViewController.h>
@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad
{
    [self showWebView];
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
}


-(void)showWebView
{
    CDVViewController *cdvViewController = [CDVViewController new];
    cdvViewController.wwwFolderName = @"www";
    cdvViewController.startPage = @"index.html";
    //cdvViewController.useSplashScreen = YES;
    //cdvViewController.view.frame = self.view.frame;
    [self.view addSubview:cdvViewController.view];
}


- (void)viewDidUnload
{
    [super viewDidUnload];
    // Release any retained subviews of the main view.
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    return (interfaceOrientation != UIInterfaceOrientationPortraitUpsideDown);
}

@end
