/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at
 
 http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

#import <SenTestingKit/SenTestingKit.h>

#import "CDVWhitelist.h"

@interface CDVWhitelistTests : SenTestCase
@end

@implementation CDVWhitelistTests

- (void)setUp
{
    [super setUp];
    
    // setup code here
}

- (void)tearDown
{
    // Tear-down code here.

    [super tearDown];
}

- (void) testAllowedSchemes
{
    NSArray* allowedHosts = [NSArray arrayWithObjects: 
                             @"*.apache.org",
                             nil];
    
    CDVWhitelist* whitelist = [[CDVWhitelist alloc] initWithArray:allowedHosts];
    
    STAssertTrue([whitelist schemeIsAllowed:@"http"], nil);
    STAssertTrue([whitelist schemeIsAllowed:@"https"], nil);
    STAssertTrue([whitelist schemeIsAllowed:@"ftp"], nil);
    STAssertTrue([whitelist schemeIsAllowed:@"ftps"], nil);
    STAssertFalse([whitelist schemeIsAllowed:@"gopher"], nil);
    
    [whitelist release];

}

- (void) testSubdomainWildcard
{
    NSArray* allowedHosts = [NSArray arrayWithObjects: 
                     @"*.apache.org",
                     nil];
    
    CDVWhitelist* whitelist = [[CDVWhitelist alloc] initWithArray:allowedHosts];
    
    STAssertTrue([whitelist URLIsAllowed:[NSURL URLWithString:@"http://build.apache.org"]], nil);
    STAssertTrue([whitelist URLIsAllowed:[NSURL URLWithString:@"http://apache.org"]], nil);
    STAssertTrue([whitelist URLIsAllowed:[NSURL URLWithString:@"http://sub1.sub0.build.apache.org"]], nil);
    STAssertFalse([whitelist URLIsAllowed:[NSURL URLWithString:@"http://apache.org.ca"]], nil);
    
    [whitelist release];
}

- (void) testWildcardInTLD
{
    // NOTE: if the user chooses to do this (a wildcard in the TLD, not a wildcard as the TLD), we allow it because we assume they know what they are doing! We don't replace it with known TLDs
    // This might be applicable for custom TLDs on a local network DNS
    
    NSArray* allowedHosts = [NSArray arrayWithObjects: 
                             @"apache.o*g",
                             nil];
    
    CDVWhitelist* whitelist = [[CDVWhitelist alloc] initWithArray:allowedHosts];
    
    STAssertTrue([whitelist URLIsAllowed:[NSURL URLWithString:@"http://apache.ogg"]], nil);
    STAssertFalse([whitelist URLIsAllowed:[NSURL URLWithString:@"http://apache.foo"]], nil);
    
    [whitelist release];
}

- (void) testTLDWildcard
{    
    NSArray* allowedHosts = [NSArray arrayWithObjects: 
                             @"apache.*",
                             nil];
    
    CDVWhitelist* whitelist = [[CDVWhitelist alloc] initWithArray:allowedHosts];
    
    NSString* hostname = @"apache";
    
    NSArray* knownTLDs = [NSArray arrayWithObjects:
                          @"aero", @"asia", @"arpa", @"biz", @"cat",
                          @"com", @"coop", @"edu", @"gov", @"info",
                          @"int", @"jobs", @"mil", @"mobi", @"museum",
                          @"name", @"net", @"org", @"pro", @"tel",
                          @"travel", @"xxx",
                          nil];
    
    // 26*26 combos
    NSMutableArray* twoCharCountryCodes = [NSMutableArray arrayWithCapacity:(26*26)];
    for (char c0 = 'a'; c0 <= 'z'; ++c0)
    {
        for (char c1 = 'a'; c1 <= 'z'; ++c1)
        {
            [twoCharCountryCodes addObject:[NSString stringWithFormat:@"%c%c", c0, c1]];
        }
    }

    NSMutableArray* shouldPass = [NSMutableArray arrayWithCapacity:[knownTLDs count]+[twoCharCountryCodes count]];

    NSEnumerator* knownTLDEnumerator = [knownTLDs objectEnumerator];
    NSString* tld = nil;
    
    while (tld = [knownTLDEnumerator nextObject])
    {
        [shouldPass addObject:[NSURL URLWithString:[NSString stringWithFormat:@"http://%@.%@", hostname, tld]]];
    }

    NSEnumerator* twoCharCountryCodesEnumerator = [twoCharCountryCodes objectEnumerator];
    NSString* cc = nil;
    
    while (cc = [twoCharCountryCodesEnumerator nextObject])
    {
        [shouldPass addObject:[NSURL URLWithString:[NSString stringWithFormat:@"http://%@.%@", hostname, cc]]];
    }
    
    NSEnumerator* shouldPassEnumerator = [shouldPass objectEnumerator];
    NSURL* url = nil;

    while (url = [shouldPassEnumerator nextObject])
    {
        STAssertTrue([whitelist URLIsAllowed:url], @"Url tested :%@", [url description]);
    }
    
    STAssertFalse(([whitelist URLIsAllowed:[NSURL URLWithString:[NSString stringWithFormat:@"http://%@.%@", hostname, @"faketld"]]]), nil);
    STAssertFalse([whitelist URLIsAllowed:[NSURL URLWithString:@"http://unknownhostname.faketld"]], nil);
    STAssertFalse([whitelist URLIsAllowed:[NSURL URLWithString:@"http://unknownhostname.com"]], nil);
    STAssertFalse([whitelist URLIsAllowed:[NSURL URLWithString:@"http://www.apache.org"]], nil);
    
    [whitelist release];
}

- (void) testCatchallWildcardOnly
{    
    NSArray* allowedHosts = [NSArray arrayWithObjects: 
                             @"*",
                             nil];
    
    CDVWhitelist* whitelist = [[CDVWhitelist alloc] initWithArray:allowedHosts];
    
    STAssertTrue([whitelist URLIsAllowed:[NSURL URLWithString:@"http://apache.org"]], nil);
    STAssertTrue([whitelist URLIsAllowed:[NSURL URLWithString:@"http://build.apache.prg"]], nil);
    STAssertTrue([whitelist URLIsAllowed:[NSURL URLWithString:@"http://MyDangerousSite.org"]], nil);
    STAssertTrue([whitelist URLIsAllowed:[NSURL URLWithString:@"http://apache.org.SuspiciousSite.com"]], nil);
    
    [whitelist release];
}

- (void) testWildcardInHostname
{    
    NSArray* allowedHosts = [NSArray arrayWithObjects: 
                             @"www.*apac*he.org",
                             nil];
    
    CDVWhitelist* whitelist = [[CDVWhitelist alloc] initWithArray:allowedHosts];
        
    STAssertTrue([whitelist URLIsAllowed:[NSURL URLWithString:@"http://www.apache.org"]], nil);
    STAssertTrue([whitelist URLIsAllowed:[NSURL URLWithString:@"http://www.apacMAChe.org"]], nil);
    STAssertTrue([whitelist URLIsAllowed:[NSURL URLWithString:@"http://www.MACapache.org"]], nil);
    STAssertTrue([whitelist URLIsAllowed:[NSURL URLWithString:@"http://www.MACapacMAChe.org"]], nil);
    STAssertFalse([whitelist URLIsAllowed:[NSURL URLWithString:@"http://apache.org"]], nil);
    
    [whitelist release];
}

- (void) testExactMatch
{    
    NSArray* allowedHosts = [NSArray arrayWithObjects: 
                             @"www.apache.org",
                             nil];
    
    CDVWhitelist* whitelist = [[CDVWhitelist alloc] initWithArray:allowedHosts];
    
    STAssertTrue([whitelist URLIsAllowed:[NSURL URLWithString:@"http://www.apache.org"]], nil);
    STAssertFalse([whitelist URLIsAllowed:[NSURL URLWithString:@"http://build.apache.org"]], nil);
    STAssertFalse([whitelist URLIsAllowed:[NSURL URLWithString:@"http://apache.org"]], nil);
    
    [whitelist release];
}

- (void) testWildcardMix
{    
    NSArray* allowedHosts = [NSArray arrayWithObjects: 
                             @"*.apac*he.*",
                             nil];
    
    CDVWhitelist* whitelist = [[CDVWhitelist alloc] initWithArray:allowedHosts];
    
    STAssertTrue([whitelist URLIsAllowed:[NSURL URLWithString:@"http://www.apache.org"]], nil);
    STAssertTrue([whitelist URLIsAllowed:[NSURL URLWithString:@"http://apache.org"]], nil);
    STAssertTrue([whitelist URLIsAllowed:[NSURL URLWithString:@"http://apacMAChe.ca"]], nil);
    STAssertTrue([whitelist URLIsAllowed:[NSURL URLWithString:@"http://apacMAChe.museum"]], nil);
    STAssertFalse([whitelist URLIsAllowed:[NSURL URLWithString:@"http://blahMAChe.museum"]], nil);
    
    [whitelist release];
}

- (void) testIpExactMatch
{    
    NSArray* allowedHosts = [NSArray arrayWithObjects: 
                             @"192.168.1.1",
                             @"192.168.2.1",
                             nil];
    
    CDVWhitelist* whitelist = [[CDVWhitelist alloc] initWithArray:allowedHosts];
    
    STAssertFalse([whitelist URLIsAllowed:[NSURL URLWithString:@"http://apache.org"]], nil);
    STAssertTrue([whitelist URLIsAllowed:[NSURL URLWithString:@"http://192.168.1.1"]], nil);
    STAssertTrue([whitelist URLIsAllowed:[NSURL URLWithString:@"http://192.168.2.1"]], nil);
    STAssertFalse([whitelist URLIsAllowed:[NSURL URLWithString:@"http://192.168.3.1"]], nil);
    
    [whitelist release];
}

- (void) testIpWildcardMatch
{    
    NSArray* allowedHosts = [NSArray arrayWithObjects: 
                             @"192.168.1.*",
                             @"192.168.2.*",
                             nil];
    
    CDVWhitelist* whitelist = [[CDVWhitelist alloc] initWithArray:allowedHosts];
    
    STAssertFalse([whitelist URLIsAllowed:[NSURL URLWithString:@"http://apache.org"]], nil);
    STAssertTrue([whitelist URLIsAllowed:[NSURL URLWithString:@"http://192.168.1.1"]], nil);
    STAssertTrue([whitelist URLIsAllowed:[NSURL URLWithString:@"http://192.168.1.2"]], nil);
    STAssertTrue([whitelist URLIsAllowed:[NSURL URLWithString:@"http://192.168.2.1"]], nil);
    STAssertTrue([whitelist URLIsAllowed:[NSURL URLWithString:@"http://192.168.2.2"]], nil);
    STAssertFalse([whitelist URLIsAllowed:[NSURL URLWithString:@"http://192.168.3.1"]], nil);
    
    [whitelist release];
}



@end
